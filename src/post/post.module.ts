import { Module } from "@nestjs/common";

import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Entities } from "../entity";

@Module({
  imports: [TypeOrmModule.forFeature(Entities)],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
