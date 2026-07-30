import { Resend } from "resend";

import { envs } from "../../config";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
}

export class EmailService {
  private resend = new Resend(envs.RESEND_API_KEY);

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody } = options;

    try {
      console.log("Intentando enviar correo a:", to);

      const { data, error } = await this.resend.emails.send({
        from: `Watches <${envs.MAILER_EMAIL}>`,
        to,
        subject,
        html: htmlBody,
      });

      if (error) {
        console.error("Error de Resend:");
        console.error(error);

        return false;
      }

      console.log("Correo enviado correctamente");
      console.log(data);

      return true;
    } catch (error) {
      console.error("Error enviando correo:");
      console.error(error);

      return false;
    }
  }
}
