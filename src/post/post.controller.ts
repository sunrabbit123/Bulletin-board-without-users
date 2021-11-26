import {
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { AuthMiddleware } from "../util/auth";

@Controller("post")
@ApiTags("대충 게시글 관련 API")
export class PostController {
  @Get(":id")
  @ApiOperation({
    summary: "해당 게시글 조회",
    description: "게시글을 조회해드리옵니다 즌하",
  })
  async getPostById(@Param("id") postId: number) {}

  @Get(":page")
  @ApiOperation({
    summary: "게시글 페이징",
    description: "게시글을 검색하고, 페이징작업을 합니다.",
  })
  async searchPost(@Param("page") page: number, @Query("k") keyword: string) {}

  @Post("")
  @ApiOperation({
    summary: "게시글 생성",
    description: "게시글을 생성해줍니다.",
  })
  @AuthMiddleware.tokenValidate
  async createPost(email: string, @Headers("authorization") token: string) {}

  @Patch(":id")
  @ApiOperation({
    summary: "게시글 수정",
    description: "게시글을 수정하여봅시다.",
  })
  @AuthMiddleware.tokenValidate
  async patchPost(
    email: string,
    @Headers("authorization") token: string,
    @Param("id") postId: number
  ) {}

  @Delete(":id")
  @ApiOperation({
    summary: "게시글 삭제",
    description: "게시글을 삭제해봅시다.",
  })
  @AuthMiddleware.tokenValidate
  async deletePost(
    email: string,
    @Headers("authorization") token: string,
    @Param("id") postId: number
  ) {}
}
