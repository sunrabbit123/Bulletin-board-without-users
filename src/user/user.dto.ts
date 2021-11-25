import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDTO {
  @ApiProperty({ description: "이메일" })
  email: string;

  @ApiProperty({ description: "비밀번호" })
  password: string;
}

export class RegistUserDTO extends LoginUserDTO {
  @ApiProperty({ description: "닉네임" })
  nickname: string;
}

export class UserDTO extends RegistUserDTO {
  @ApiProperty({ description: "고유 아이디" })
  id: number;
}

export class AuthenticatedUser extends UserDTO {
  @ApiProperty({ description: "유저 액세스 토큰" })
  token: string;
}
