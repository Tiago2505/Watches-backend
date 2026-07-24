import { Router } from "express";

import { WatchesRoutes } from "./watches";
import { AuthRoutes } from "./auth/routes";
import { PasswordResetRoutes } from "./password-reset/routes";



export class AppRoutes{



    static get routes(): Router{

        const router = Router();


        router.use('/api/watches', WatchesRoutes.routes );
        router.use('/api/auth', AuthRoutes.routes );
        router.use('/api/password-reset', PasswordResetRoutes.routes);

        return router;

    }

}