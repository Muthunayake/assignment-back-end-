/// <reference types="passport" />
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UsersService } from "../../users/services/users.service";
import { RegisterDTO } from "../dto/auth";
import { MainService } from "../../../utils/main/main.service";
import { LoginDTO } from "../dto/login";
export declare class AuthController {
    private mainService;
    private userService;
    private authService;
    constructor(mainService: MainService, userService: UsersService, authService: AuthService);
    register(registerDTO: RegisterDTO, response: Response): Promise<void>;
    login(req: Request, loginDTO: LoginDTO, response: Response): Promise<void>;
    getProfile(req: Request): Express.User;
}
