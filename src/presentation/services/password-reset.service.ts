import crypto from "crypto";

import { Bcrypt, prisma } from "../../config";

import {
  CreatePasswordResetDto,
  CustomError,
  PasswordReset,
  UpdatePasswordDto,
  VerifyCodeDto,
} from "../../domain";
import { EmailService } from "./email.service";
import { passwordResetTemplate } from "../templates";

export class PasswordResetService {
  constructor(
    private readonly emailService: EmailService,
  ) {}

  private generateNewCode(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  private generateExpiresDate(): Date {
    return new Date(Date.now() + 10 * 60 * 1000);
  }

  public async createNewPasswordReset( createPasswordResetDto: CreatePasswordResetDto ): Promise<PasswordReset> {
    const { email } = createPasswordResetDto;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists)
      throw CustomError.notFound(`User with email: ${email} not found`);

    const newCode = await prisma.passwordReset.create({
      data: {
        code: this.generateNewCode(),
        expiresAt: this.generateExpiresDate(),
        userId: userExists.id,
      },
    });

    const htmlBody: string = passwordResetTemplate(newCode.code);

    const options = {
      to: userExists.email,
      subject: "Reset password",
      htmlBody: htmlBody,
    };

    const sendEmail = this.emailService.sendEmail(options);

    if(!sendEmail) throw CustomError.internalServer('Could not send email');

    return newCode;
  }

  public async verifyCode (verifyCodeDto: VerifyCodeDto): Promise<PasswordReset>{
    const { email, code } = verifyCodeDto;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists)
      throw CustomError.notFound(`User with email: ${email} not found`);

    const codeExists = await prisma.passwordReset.findFirst({
      where: {
        userId: userExists.id,
        code: code,
        used: false,
      },
    });

    if (!codeExists)
      throw CustomError.notFound(`The code: ${code} does not exist`);

    if (codeExists.expiresAt < new Date()) {
      throw CustomError.badRequest("The code has expired");
    }

    const codeHasUsed = await prisma.passwordReset.update({
      where: { id: codeExists.id },
      data: {
        used: true,
      },
    });

    return codeHasUsed;
  };

   public async changePassword (updatePasswordDto: UpdatePasswordDto){

    const user = await prisma.user.findUnique({
      where: {email: updatePasswordDto.email}
    });

    if(Bcrypt.compare(updatePasswordDto.newPassword, user!.password)) throw CustomError.badRequest('Your new password must be different from your previous password.');

    const passwordHash= Bcrypt.hash(updatePasswordDto.newPassword);

    const userUpdated = await prisma.user.update({
      where: {email: updatePasswordDto.email},
      data: {
        password: passwordHash
      }
    });

    return userUpdated;
  }
}
