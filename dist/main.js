"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function initiation() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix("/api/v1");
    app.enableCors({
        origin: configService.get("CORS_ORIGIN"),
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        exposedHeaders: "*",
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Sample Micro Service")
        .setDescription(`This includes the APIs documentation for micro service.`)
        .setVersion("1.0")
        .addBearerAuth({
        description: "Access Token",
        name: "Authorization",
        bearerFormat: "Bearer",
        scheme: "Bearer",
        type: "http",
        in: "Header",
    }, "access-token")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api/v1/swagger-documentation", app, document);
    await app.listen(configService.get("PORT"), '0.0.0.0');
    console.log("Micro service started at port : " + configService.get("PORT"));
}
initiation().then();
//# sourceMappingURL=main.js.map