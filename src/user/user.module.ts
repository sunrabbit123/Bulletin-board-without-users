import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Entities } from "../entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature(Entities)],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
