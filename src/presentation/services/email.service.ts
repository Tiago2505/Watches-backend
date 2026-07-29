import nodemailer from "nodemailer";

import { envs } from "../../config";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

interface Attachement {
  filename: string;
  path: string;
}

export class EmailService {

  constructor() {}

  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });


  async sendEmail(options: SendMailOptions): Promise<boolean> {
  const { to, subject, htmlBody, attachements = [] } = options;

  try {

    console.log("1. Iniciando envío de correo");

    const sentInformation = await this.transporter.sendMail({
      to,
      subject,
      html: htmlBody,
      attachments: attachements,
    });

    console.log("2. Correo enviado");
    console.log(sentInformation.messageId);

    return true;

  } catch (error) {

    console.error("3. Error enviando correo");
    console.error(error);

    return false;
  }
}
  
}
