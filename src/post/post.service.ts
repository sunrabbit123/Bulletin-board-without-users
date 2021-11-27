import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Post, User } from "../entity";
import { CreatePostDTO, PatchPostDTO } from "./post.dto";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}
  public isNumeric(data: string | number): boolean {
    return !isNaN(Number(data));
  }

  getPostById(id: number): Promise<Post> {
    if (id == undefined) {
      throw new BadRequestException("id값이 있어야 합니다.");
    }
    if (!this.isNumeric(id)) {
      throw new BadRequestException("id값이 숫자여야 합니다.");
    }
    return this.postRepository.findOne({ id });
  }
  async searchPostByKeywordAndPaging({
    page,
    keyword,
  }: {
    page: number;
    keyword: string;
  }) {
    console.log(keyword);
    keyword = keyword ?? "";
    return this.postRepository
      .createQueryBuilder("post")
      .where("post.title like :keyword", { keyword: `%${keyword}%` })
      .orWhere("post.content like :keyword", { keyword: `%${keyword}%` })
      .orWhere("post.tags like :keyword", { keyword: `%${keyword}%` })
      .skip((page ?? 1) - 1 * 10)
      .limit(20)
      .getMany();
  }

  async createPost({ title, content, tags }: CreatePostDTO, email: string) {
    if (!this.checkPostPublicDTO({ title, content, tags })) {
      throw new BadRequestException(
        "title, content, tags 중 하나가 누락됐습니다."
      );
    }

    if (!email) {
      throw new BadRequestException("인증 토큰이 누락됐습니다.");
    }
    const post = new Post();
    post.title = title;
    post.content = content;
    post.tags = tags;
    post.user = (await this.userRepository.find({ where: { email } }))[0];

    return this.postRepository.save(post);
  }
  checkPostPublicDTO({ title, content, tags }: CreatePostDTO) {
    return title && content && tags;
  }
  async patchPost(
    { title, content, tags }: PatchPostDTO,
    postId: number,
    email: string
  ) {
    if (!this.isNumeric(postId)) {
      throw new BadRequestException("post id값이 숫자가 아닙니다.");
    }
    const post = (
      await this.postRepository.find({
        select: ["title", "comments", "content", "tags", "id"],
        relations: ["user"],
        where: {
          id: postId,
          user: {
            email,
          },
        },
      })
    )[0];

    post.title = title ?? post.title;
    post.content = content ?? post.content;
    post.tags = tags ?? post.tags;

    return this.postRepository.save(post);
  }

  async deletePost(postId: number, email: string) {
    if (!this.isNumeric(postId)) {
      throw new BadRequestException("post id값이 숫자가 아닙니다.");
    }

    const targetPost = await this.postRepository.find({
      select: ["title", "comments", "content", "tags", "id"],
      relations: ["user"],
      where: {
        id: postId,
        user: {
          email,
        },
      },
    });
    if (!targetPost) {
      throw new NotFoundException("찾을 수 없습니다.");
    }

    return this.postRepository.remove(targetPost);
  }
}
