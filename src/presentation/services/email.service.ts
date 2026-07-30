import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

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
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
    family: 4,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  } as SMTPTransport.Options);

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
