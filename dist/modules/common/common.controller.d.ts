import { Request, Response } from "express";
import { MainService } from "../../utils/main/main.service";
export declare class CommonController {
    private mainsService;
    constructor(mainsService: MainService);
    healthCheck(request: Request, response: Response): Promise<void>;
}
