import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginUserDTO, RegistUserDTO, UserDTO } from "./user.dto";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("유저 관련 API")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("regist")
  @ApiOperation({
    summary: "유저 가입 API",
    description: "유저가 가입합니다.",
  })
  @ApiOkResponse({ description: "가입 성공", type: UserDTO })
  async regist(@Body() userData: RegistUserDTO) {
    return this.userService.regist(userData);
  }

  @Post("login")
  @ApiOperation({
    summary: "유저 로그인 API",
    description: "유저가 로그인합니다",
  })
  @ApiOkResponse({ description: "로그인 성공", type: UserDTO })
  async login(@Body() userData: LoginUserDTO) {
    return this.userService.login(userData);
  }
}
