import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { ApiResponse } from "@nestjs/swagger";

import { AuthService } from "../services/auth.service";
import { UsersService } from "../../users/services/users.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RegisterDTO } from "../dto/auth";
import { MainService } from "../../../utils/main/main.service";
import { ResponseMessages } from "../../../configs/response.message";
import { ResponseCode } from "../../../configs/response.codes";
import { User } from "../../users/schemas/user.schema";
import { LoginDTO } from "../dto/login";

@Controller("auth")
export class AuthController {
  constructor(
    private mainService: MainService,
    private userService: UsersService,
    private authService: AuthService
  ) {
  }

  @ApiResponse({ status: 200, description: "Success" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Post("register")
  async register(@Body() registerDTO: RegisterDTO, @Res() response: Response) {
    try {
      const user: User = await this.userService.create(registerDTO.email, registerDTO.password, registerDTO.name);

      this.mainService.sendResponse(response, ResponseMessages.SUCCESS, user, true, ResponseCode.SUCCESS);

    } catch (error) {
      this.mainService.sendResponse(
        response,
        ResponseMessages.INTERNAL_SERVER_ERROR,
        error,
        false,
        ResponseCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  @ApiResponse({ status: 200, description: "Success" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Post("login")
  async login(@Req() req: Request, @Body() loginDTO: LoginDTO, @Res() response: Response) {
    try {

      const accessToken = await this.authService.login(loginDTO);
      this.mainService.sendResponse(response, ResponseMessages.SUCCESS, accessToken, true, ResponseCode.SUCCESS);
    } catch (error) {
      this.mainService.sendResponse(
        response,
        ResponseMessages.INTERNAL_SERVER_ERROR,
        error,
        false,
        ResponseCode.INTERNAL_SERVER_ERROR
      );
    }

  }

  @ApiResponse({ status: 200, description: "Success" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Req() req: Request) {
    return req.user;
  }


}
