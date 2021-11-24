import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostModule } from "./post/post.module";
import { CommentModule } from "./comment/comment.module";
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "1234",
      database: "test",
      autoLoadEntities: true,
      synchronize: true,
    }),
    PostModule,
    CommentModule,
    UserModule,
  ],
  controllers: [UserController],
})
export class AppModule {}
