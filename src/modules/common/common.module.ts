import { Module } from "@nestjs/common";

import { CommonController } from "./common.controller";
import { MainService } from "../../utils/main/main.service";

@Module({
  controllers: [CommonController],
  providers: [MainService]
})
export class CommonModule {
}
