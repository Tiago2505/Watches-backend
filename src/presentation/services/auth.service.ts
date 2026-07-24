import { Bcrypt, JwtAdapter, prisma } from "../../config";

import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

interface Response {
  user: UserEntity;
  token: string;
}

export class AuthService {
  public async register(registerUserDto: RegisterUserDto): Promise<Response> {
    const passwordEncrypted = Bcrypt.hash(registerUserDto.password);

    const { fullName, email, phone } = registerUserDto;

    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (emailExists)
      throw CustomError.badRequest(`User with email ${email} already exists`);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        password: passwordEncrypted,
      },
    });

    const token = await JwtAdapter.generateToken({
      id: newUser.id,
      fullName: newUser.fullName,
      phone: newUser.phone,
      email: newUser.email,
      role: newUser.role,
    });

    if (!token)
      throw CustomError.internalServer(
        "Could not generate authentication token",
      );

    return {
      user: newUser,
      token: token,
    };
  }

  public async login(loginUserDto: LoginUserDto): Promise<Response> {
    const { email, password } = loginUserDto;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists)
      throw CustomError.notFound(`User with email: ${email} not found`);

    const passwordMatch = Bcrypt.compare(password, userExists.password);

    if (!passwordMatch) throw CustomError.unAuthorized("Incorrect password");

    const token = await JwtAdapter.generateToken({
      id: userExists.id,
      fullName: userExists.fullName,
      phone: userExists.phone,
      email: userExists.email,
      role: userExists.role,
    });

    if (!token)
      throw CustomError.internalServer(
        "Could not generate authentication token",
      );

    return {
      user: userExists,
      token: token,
    };
  }
}
