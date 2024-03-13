import { Response } from "express";
export declare class MainService {
    sendResponse(res: Response, message: string, data: any, success: boolean, code: number, responseCode?: number): object;
}
