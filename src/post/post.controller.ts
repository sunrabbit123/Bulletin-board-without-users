import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { AuthMiddleware } from "../util/auth";
import { CreatePostDTO, PatchPostDTO, PostDTO } from "./post.dto";
import { PostService } from "./post.service";

@Controller("post")
@ApiTags("대충 게시글 관련 API")
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get(":id")
  @ApiOperation({
    summary: "해당 게시글 조회",
    description: "게시글을 조회해드리옵니다 즌하",
  })
  @ApiOkResponse({ description: "성공 시", type: PostDTO })
  async getPostById(@Param("id") postId: number) {
    return this.postService.getPostById(postId);
  }

  @Get("")
  @ApiOperation({
    summary: "게시글 페이징",
    description: "게시글을 검색하고, 페이징작업을 합니다.",
  })
  @ApiOkResponse({ description: "성공 시", type: [PostDTO] })
  async searchPost(@Query("page") page: number, @Query("k") keyword: string) {
    return this.postService.searchPostByKeywordAndPaging({
      page,
      keyword,
    });
  }

  @Post("")
  @ApiOperation({
    summary: "게시글 생성(Auth)",
    description: "게시글을 생성해줍니다.",
  })
  @ApiOkResponse({ description: "성공 시", type: PostDTO })
  @AuthMiddleware.tokenValidate
  async createPost(
    email: string,
    @Headers("authorization") token: string,
    @Body() data: CreatePostDTO
  ) {
    return this.postService.createPost(data, email);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "게시글 수정(Auth)",
    description: "게시글을 수정하여봅시다.",
  })
  @ApiOkResponse({ description: "성공 시", type: PostDTO })
  @AuthMiddleware.tokenValidate
  async patchPost(
    email: string,
    @Headers("authorization") token: string,
    @Param("id") postId: number,
    @Body() data: PatchPostDTO
  ) {
    return this.postService.patchPost(data, postId, email);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "게시글 삭제(Auth)",
    description: "게시글을 삭제해봅시다.",
  })
  @ApiOkResponse({ description: "성공 시", type: PostDTO })
  @AuthMiddleware.tokenValidate
  async deletePost(
    email: string,
    @Headers("authorization") token: string,
    @Param("id") postId: number
  ) {
    return this.postService.deletePost(postId, email);
  }
}
