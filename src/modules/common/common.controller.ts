import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

import { MainService } from "../../utils/main/main.service";
import { ResponseCode } from "../../configs/response.codes";

@Controller("common")
export class CommonController {
  constructor(private mainsService: MainService) {
  }

  @Get("health-check")
  async healthCheck(@Req() request: Request, @Res() response: Response) {
    try {
      this.mainsService.sendResponse(
        response,
        "Microservice healthy!",
        {},
        true,
        ResponseCode.SUCCESS,
        ResponseCode.SUCCESS
      );
    } catch (error) {
      this.mainsService.sendResponse(
        response,
        "Microservice unhealthy!",
        {},
        false,
        ResponseCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
