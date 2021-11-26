import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Entities } from "../entity";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";

@Module({
  imports: [TypeOrmModule.forFeature(Entities)],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
