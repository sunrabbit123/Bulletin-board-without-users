import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/User";
import { generatedTokenByEmail, hashPassword } from "src/util/crypto";
import { Repository } from "typeorm";
import { LoginUserDTO, RegistUserDTO } from "./user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  private checkRegistUserDTO({
    email,
    nickname,
    password,
  }: RegistUserDTO): void {
    if (!email || !password || !nickname) {
      throw new BadRequestException();
    }
    if (nickname.length < 8 || password.length < 8 || email.length < 8) {
      throw new BadRequestException(
        "이메일과 닉네임, 패스워드는 8자 이상이여야 합니다."
      );
    }
  }

  regist({ email, nickname, password }: RegistUserDTO) {
    this.checkRegistUserDTO({ email, nickname, password });

    const trimedEmail = email.trim();
    const trimedPassword = password.trim();
    const hashedPassword = hashPassword(trimedPassword);
    const token = generatedTokenByEmail(email);

    return this.userRepository.save({
      email: trimedEmail,
      password: hashedPassword,
      nickname,
      token,
    });
  }
  async login({}: LoginUserDTO) {}
}
