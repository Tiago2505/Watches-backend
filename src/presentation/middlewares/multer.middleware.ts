import multer from 'multer';


const storage = multer.memoryStorage();


export const upload = multer({
    storage,
    fileFilter(req, file, callback){
        if(file.mimetype.startsWith('image') || file.mimetype.startsWith('video ')){
            callback(null, true);
        }else{
            callback(new Error('Only images and videos are allowed'));
        }
    }
});