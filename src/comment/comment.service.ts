import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Comment, Post, User } from "../entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}
  public isNumeric(data: string | number): boolean {
    return !isNaN(Number(data));
  }

  async addCommentByPost(id: number, email: string, content: string) {
    if (!this.isNumeric(id)) {
      throw new BadRequestException("id값이 숫자여야 합니다.");
    }
    const comment = new Comment();
    comment.content = content;
    comment.user = (await this.userRepository.find({ where: { email } }))[0];
    comment.post = (await this.postRepository.find({ where: { id } }))[0];
    return this.commentRepository.save(comment);
  }

  async patchCommentByPost(id: number, email: string, content: string) {
    if (!this.isNumeric(id)) {
      throw new BadRequestException("id값이 숫자여야 합니다.");
    }
    const comment = (
      await this.commentRepository.find({
        where: { id, user: { email } },
        relations: ["user"],
      })
    )[0];
    console.log(comment);
    if (comment.user.email != email) {
      throw new ForbiddenException("권한이 없습니다");
    }
    comment.content = content ?? comment.content;

    return this.commentRepository.save(comment);
  }
  async deleteComment(id: number, email: string) {
    if (!this.isNumeric(id)) {
      throw new BadRequestException("id값이 숫자여야 합니다.");
    }

    const targetComment = (
      await this.commentRepository.find({
        where: { id, user: { email } },
        relations: ["user"],
      })
    )[0];

    if (!targetComment) {
      throw new NotFoundException("찾을 수 없습니다.");
    }

    return this.commentRepository.remove(targetComment);
  }
}
