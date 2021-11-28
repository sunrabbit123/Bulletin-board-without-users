import {
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Headers,
  Body,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthMiddleware } from "src/util/auth";
import { CommentContainsBothDTO, CommentContainsUserDTO } from "./comment.dto";
import { CommentService } from "./comment.service";

@Controller("comment")
@ApiTags("댓글 관련 API")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(":id")
  @ApiOperation({
    summary: "게시물 댓글 달기(Auth)",
    description: "해당 게시물에 댓글을 달아드립니다~",
  })
  @ApiOkResponse({ description: "성공 시", type: CommentContainsBothDTO })
  @AuthMiddleware.tokenValidate
  async addCommentByPost(
    email: string,
    @Headers("authorization") token: string,
    @Param("id") postId: number,
    @Body("content") content: string
  ) {
    return this.commentService.addCommentByPost(postId, email, content);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "댓글 수정(Auth)",
    description: "id값에 해당하는 댓글을 수정합니다.",
  })
  @ApiOkResponse({ description: "성공 시", type: CommentContainsUserDTO })
  @AuthMiddleware.tokenValidate
  async patchCommentByPost(
    email: string,
    @Headers("authorization") token: string,
    @Param("id") commentId: number,
    @Body("content") content: string
  ) {
    return this.commentService.patchCommentByPost(commentId, email, content);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "댓글 삭제(Auth)",
    description: "해당 id값에 해당하는 댓글을 삭제합니다.",
  })
  @ApiOkResponse({ description: "성공 시", type: CommentContainsUserDTO })
  @AuthMiddleware.tokenValidate
  async deleteComment(
    email: string,
    @Headers("authorization") token: string,
    @Param("id") commentId: number
  ) {
    return this.commentService.deleteComment(commentId, email);
  }
}
