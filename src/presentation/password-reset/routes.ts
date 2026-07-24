import { Router } from "express";

import { PasswordResetController } from "./controller";
import { EmailService, PasswordResetService } from "../services";



export class PasswordResetRoutes{


    static get routes(): Router{

        const router = Router();

        const emailService = new EmailService();
        const service = new PasswordResetService(emailService);
        const controller = new PasswordResetController(service);

        router.post('/', controller.createNewCode);
        router.post('/verify', controller.verifyCode);
        router.post('/new-password', controller.changePassword);


        return router;

    }
}