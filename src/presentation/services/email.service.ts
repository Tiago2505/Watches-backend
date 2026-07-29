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

  async verifyConnection() {
  try {
    await this.transporter.verify();
    console.log("SMTP conectado correctamente");
  } catch (error) {
    console.error("Error SMTP:", error);
  }
}


  async sendEmail(options: SendMailOptions): Promise<boolean> {
  const { to, subject, htmlBody, attachements = [] } = options;

  try {
    await this.verifyConnection();
    console.log("Intentando enviar correo a:", to);

    const sentInformation = await this.transporter.sendMail({
      to,
      subject,
      html: htmlBody,
      attachments: attachements,
    });

    console.log("Correo enviado correctamente");
    console.log(sentInformation);

    return true;

  } catch (error) {
    console.error("Error enviando correo:");
    console.error(error);
    console.log('ha habido un error')

    return false;
  }
}
  
}
