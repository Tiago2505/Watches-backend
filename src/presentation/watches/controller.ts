import { Request, Response } from "express";

import { UploadFilesService, WatchesService } from "../services";
import { CreateWatchDto, UpdateWatchDto } from "../../domain";
import { handleError } from "../helpers";

export class WatchesController {
  constructor(
    private readonly service: WatchesService,
    private readonly uploadService: UploadFilesService,
  ) {}

  createWatch = async (req: Request, resp: Response) => {

    try {
      const images = req.files;
      const { folder } = req.query;
  
      if (!folder) return resp.status(400).json("Missing folder");
  
      if (typeof folder !== "string")
        return resp.status(400).json("Invalid folder");
  
      if (!Array.isArray(images)) return ["Invalid images"];
  
      const imagesUrl = await this.uploadService.secureUrlImages(images, folder);
      const [error, createWatchDto] = CreateWatchDto.create({
        ...req.body,
        imagesUrl
      });
  
      if(error) return resp.status(400).json({error});
  
      return resp.status(200).json(await this.service.createWatch(createWatchDto!));
      
    } catch (error) {
      return handleError(error, resp);
    }

  };

  getAllWatches = async (req: Request, res: Response) => {

    try {
      res.status(200).json(await this.service.getAllWatches());
    } catch (error) {
      return handleError(error, res);
    }

  };

  getWatchById = async (req: Request, res: Response) => {

    try {
      
      const id = +req.params.id!;
  
      if (!id) return res.status(400).json("Missing id");
  
      return res.status(200).json(await this.service.getWatchById(id));
    } catch (error) {
      return handleError(error, res);
    }

  };

  updateWatch = async (req: Request, resp: Response) => {

    try {
      
      const id = +req.params.id!;
      const {folder} = req.query;
      const newImages = req.files;
      const {deletedImages, currentImages} = req.body;
  
      
      if(!folder) return resp.status(400).json('Missing folder');
      
      if(typeof folder !== 'string' ) return resp.status(400).json('Invalid folder');
  
      if(!Array.isArray(newImages)) return resp.status(400).json('Invalid images');
      
  
      if(deletedImages){
        const parsedDeletedImages = JSON.parse(deletedImages);
        
        if(parsedDeletedImages.length >0){
          await this.uploadService.deleteImages(parsedDeletedImages);
        }
      }
  
      let imagesUrl = await this.uploadService.secureUrlImages(newImages, folder);
  
      if(currentImages){
  
        const currentImagesParsed = JSON.parse(currentImages);
  
        if(currentImagesParsed.length > 0){
  
          imagesUrl = imagesUrl.concat(currentImagesParsed)
        }
      }
     
      const [error, updateWatchDto] = UpdateWatchDto.update({
        ...req.body, 
        id,
        imagesUrl
      });
  
      if(error) return resp.status(400).json({error});
  
  
      resp.status(200).json(await this.service.updateWatch(updateWatchDto!));
    } catch (error) {
      return handleError(error, resp);
    }

  };

  deleteWatch = async (req: Request, res: Response) => {

    try {
      
      const id = +req.params.id!;
      const {publicImageIds} =req.body; 
      if (!id) return res.status(400).json("Missing id");
  
      if(!Array.isArray(publicImageIds) || !publicImageIds.every(id => typeof id === 'string')) return res.status(400).json('Invalid public image ids');
  
      await this.uploadService.deleteImages(publicImageIds);
  
      res.status(200).json(await this.service.deleteWatch(id));
    } catch (error) {
      return handleError(error, res);
    }

  };

  searchWatchesByParam = async (req: Request, res: Response) => {

    try {
      
      const { param } = req.query;
  
      if (!param || typeof param !== "string") {
        return res.status(400).json("Missing param");
      }
  
      res.status(200).json(await this.service.searchWatchesByParam(param));
    } catch (error) {
      return handleError(error, res);
    }

  };
}
