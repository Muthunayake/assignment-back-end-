"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../services/auth.service");
const users_service_1 = require("../../users/services/users.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const auth_1 = require("../dto/auth");
const main_service_1 = require("../../../utils/main/main.service");
const response_message_1 = require("../../../configs/response.message");
const response_codes_1 = require("../../../configs/response.codes");
const login_1 = require("../dto/login");
let AuthController = class AuthController {
    constructor(mainService, userService, authService) {
        this.mainService = mainService;
        this.userService = userService;
        this.authService = authService;
    }
    async register(registerDTO, response) {
        try {
            const user = await this.userService.create(registerDTO.email, registerDTO.password, registerDTO.name);
            this.mainService.sendResponse(response, response_message_1.ResponseMessages.SUCCESS, user, true, response_codes_1.ResponseCode.SUCCESS);
        }
        catch (error) {
            this.mainService.sendResponse(response, response_message_1.ResponseMessages.INTERNAL_SERVER_ERROR, error, false, response_codes_1.ResponseCode.INTERNAL_SERVER_ERROR);
        }
    }
    async login(req, loginDTO, response) {
        try {
            const accessToken = await this.authService.login(loginDTO);
            this.mainService.sendResponse(response, response_message_1.ResponseMessages.SUCCESS, accessToken, true, response_codes_1.ResponseCode.SUCCESS);
        }
        catch (error) {
            this.mainService.sendResponse(response, response_message_1.ResponseMessages.INTERNAL_SERVER_ERROR, error, false, response_codes_1.ResponseCode.INTERNAL_SERVER_ERROR);
        }
    }
    getProfile(req) {
        return req.user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal server error" }),
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.RegisterDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal server error" }),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_1.LoginDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal server error" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("profile"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [main_service_1.MainService,
        users_service_1.UsersService,
        auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map