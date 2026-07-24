import { Router } from "express";

import { WatchesController } from "./controller";
import { UploadFilesService, WatchesService } from "../services";
import { AuthMiddleware, RoleMiddleware, upload } from "../middlewares";



export class WatchesRoutes{


    static get routes():Router{

        const service = new WatchesService();
        const uploadService = new UploadFilesService();

        const controller = new WatchesController(service, uploadService);

        const router = Router();

        router.post('/', [AuthMiddleware.validateJwt, RoleMiddleware.validateRole], upload.array('newImages', 4), controller.createWatch);
        router.get('/', controller.getAllWatches);
        router.get('/search', controller.searchWatchesByParam);
        router.get('/:id', [AuthMiddleware.validateJwt, RoleMiddleware.validateRole], controller.getWatchById);
        router.put('/:id', [AuthMiddleware.validateJwt, RoleMiddleware.validateRole], upload.array('newImages', 4), controller.updateWatch);
        router.delete('/:id', [AuthMiddleware.validateJwt, RoleMiddleware.validateRole], controller.deleteWatch);





        return router;
    }

}