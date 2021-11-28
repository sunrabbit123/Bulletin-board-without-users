import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

import { PostModule } from "./post/post.module";
import { CommentModule } from "./comment/comment.module";
import { UserModule } from "./user/user.module";

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
      entities: [__dirname + "/**/*/entity/*{.ts,.js}"],
      logging: false,
    }),
    ConfigModule.forRoot({
      envFilePath: [".env"],
    }),
    PostModule,
    CommentModule,
    UserModule,
  ],
})
export class AppModule {}
