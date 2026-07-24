import cloudinary from "../../config/cloudinary.adapter";

export class UploadFilesService {

  public async uploadImages(files: Express.Multer.File[], folder: string) {
    try {
      const result = Promise.all(

        files.map((file) =>

          cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,

            {
              folder: folder,
            },
            
          )

        )

      );

      return result;
    } catch (error) {
      console.log(`Error: ${error}`);

      throw error;
    }
  }

  public async  secureUrlImages(images: Express.Multer.File[], folder: string): Promise<string[]>{

    try {
      const imagesUploaded = await this.uploadImages(images, folder);
      
      const imagesUrl = imagesUploaded.map(image => image.secure_url);
  
      return imagesUrl;

    } catch (error) {
      console.log(`Error: ${error}`);

      throw error;
    }

  }

  public async deleteImages(images: string[]){

    try {
      const result = Promise.all(
        images.map(image => 

          cloudinary.uploader.destroy(image)

        )
      );

      return result;
    } catch (error) {
      
    }

  }
}
