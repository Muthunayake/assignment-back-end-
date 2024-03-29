"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainService = void 0;
const common_1 = require("@nestjs/common");
let MainService = class MainService {
    sendResponse(res, message, data, success, code, responseCode = null) {
        const transformedData = code === 500 ? data.toString().replace(/Error:/g, "") : data;
        return res.status(code).send({
            code: responseCode ? responseCode : code,
            data: transformedData,
            message,
            success,
        });
    }
};
exports.MainService = MainService;
exports.MainService = MainService = __decorate([
    (0, common_1.Injectable)()
], MainService);
//# sourceMappingURL=main.service.js.map