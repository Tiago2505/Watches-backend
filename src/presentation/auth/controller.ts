import { Request, Response } from "express";

import { LoginUserDto, RegisterUserDto } from "../../domain";
import { handleError } from "../helpers";
import { AuthService } from "../services";



export class AuthController{

    constructor(
        private readonly userService: AuthService
    ){}

    register = async (req: Request, res: Response)=>{

        try {
            
            const [error, createUserDto] = RegisterUserDto.create(req.body);

            if(error) return res.status(400).json({error});

            const {user, token} = await this.userService.register(createUserDto!);

            const {password, ...properties} = user;

            return res.status(200).json({user: properties, token: token});

        } catch (error) {
            return handleError(error, res);
        }

    }

    login = async(req: Request, res: Response)=>{

        try {
            const [error, loginUserDto] = LoginUserDto.login(req.body);
    
            if(error) return res.status(400).json({error});

            const {user, token} = await this.userService.login(loginUserDto!);

            const {password, ...properties} = user;

            return res.status(200).json({user: properties, token: token});
            
        } catch (error) {
            return handleError(error, res);
        }


    }


}