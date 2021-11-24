import { Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("user")
@ApiTags("유저 관련 API")
export class UserController {
  @Post("regist")
  @ApiOperation({
    summary: "유저 가입 API",
    description: "유저가 가입합니다.",
  })
  async regist() {}

  @Post("login")
  @ApiOperation({
    summary: "유저 로그인 API",
    description: "유저가 로그인합니다",
  })
  async login() {}
}
