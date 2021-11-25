import { Injectable } from "@nestjs/common";
import { LoginUserDTO, RegistUserDTO } from "./user.dto";

@Injectable()
export class UserService {
  async regist({}: RegistUserDTO) {}
  async login({}: LoginUserDTO) {}
}
