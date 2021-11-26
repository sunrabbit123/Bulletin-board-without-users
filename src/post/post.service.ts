import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Post } from "../entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private userRepository: Repository<Post>
  ) {}
}
