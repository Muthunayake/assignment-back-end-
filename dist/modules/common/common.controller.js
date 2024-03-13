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
exports.CommonController = void 0;
const common_1 = require("@nestjs/common");
const main_service_1 = require("../../utils/main/main.service");
const response_codes_1 = require("../../configs/response.codes");
let CommonController = class CommonController {
    constructor(mainsService) {
        this.mainsService = mainsService;
    }
    async healthCheck(request, response) {
        try {
            this.mainsService.sendResponse(response, "Microservice healthy!", {}, true, response_codes_1.ResponseCode.SUCCESS, response_codes_1.ResponseCode.SUCCESS);
        }
        catch (error) {
            this.mainsService.sendResponse(response, "Microservice unhealthy!", {}, false, response_codes_1.ResponseCode.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CommonController = CommonController;
__decorate([
    (0, common_1.Get)("health-check"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "healthCheck", null);
exports.CommonController = CommonController = __decorate([
    (0, common_1.Controller)("common"),
    __metadata("design:paramtypes", [main_service_1.MainService])
], CommonController);
//# sourceMappingURL=common.controller.js.map