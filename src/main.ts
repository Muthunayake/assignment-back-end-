import { NestFactory } from '@nestjs/core';
import {ConfigService} from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

import { AppModule } from './app.module';

async function initiation(): Promise<void> {
  const app : INestApplication = await NestFactory.create(AppModule);
  const configService:ConfigService = app.get<ConfigService>(ConfigService);
  app.setGlobalPrefix("/api/v1");


  app.enableCors({
    origin: configService.get("CORS_ORIGIN"),
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    exposedHeaders: "*",
  });

  const config = new DocumentBuilder()
    .setTitle("Sample Micro Service")
    .setDescription(`This includes the APIs documentation for micro service.`)
    .setVersion("1.0")
    .addBearerAuth(
      {
        description: "Access Token",
        name: "Authorization",
        bearerFormat: "Bearer",
        scheme: "Bearer",
        type: "http",
        in: "Header",
      },
      "access-token"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/v1/swagger-documentation", app, document);

  await app.listen(configService.get("PORT"),'0.0.0.0');
  console.log("Micro service started at port : " + configService.get("PORT"));

}
initiation().then();
