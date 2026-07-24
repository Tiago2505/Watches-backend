import { Router } from "express";

import { AuthController } from "./controller";
import { AuthService } from "../services";




export class AuthRoutes{

    
    static get routes(): Router{
        const router = Router();

        const service = new AuthService();
        const controller = new AuthController(service);


        router.post('/login', controller.login);
        router.post('/register', controller.register);

        return router;
    }

}