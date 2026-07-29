import { Request, Response } from "express";

import { handleError } from "../helpers";
import { PasswordResetService } from "../services";
import { CreatePasswordResetDto, UpdatePasswordDto, VerifyCodeDto } from "../../domain";



export class PasswordResetController{

    constructor(

        private readonly service: PasswordResetService

    ){}

    createNewCode=async(req: Request, res: Response)=>{
        console.log("Entró al endpoint de password reset");
        try {

            const [error, createPasswordResetDto] = CreatePasswordResetDto.create(req.body);

            if(error) return res.status(400).json({error});

            return res.status(200).json(await this.service.createNewPasswordReset(createPasswordResetDto!));

        } catch (error) {
            return handleError(error, res);
        }

    }

    verifyCode = async (req: Request, res: Response) =>{

        try {
            const [error, verifyCodeDto] = VerifyCodeDto.verify(req.body);
    
            if(error) return res.status(400).json({error});
    
            return res.status(200).json(await this.service.verifyCode(verifyCodeDto!));

        } catch (error) {
            return handleError(error, res);
        }

    }

    changePassword = async (req:Request, res: Response)=>{

        try {
            
            const [error, updatePasswordDto] = UpdatePasswordDto.update(req.body);
    
            if(error) return res.status(400).json({error});

            return res.status(200).json(await this.service.changePassword(updatePasswordDto!));

        } catch (error) {
            return handleError(error, res);
        }


    }

}