import { Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("comment")
@ApiTags("댓글 관련 API")
export class CommentController {
  @Post(":id")
  @ApiOperation({
    summary: "게시물 댓글 달기",
    description: "해당 게시물에 댓글을 달아드립니다~",
  })
  async addCommentByPost(@Param("id") postId: number) {}

  @Patch(":id")
  @ApiOperation({
    summary: "댓글 수정",
    description: "id값에 해당하는 댓글을 수정합니다.",
  })
  async patchCommentByPost(@Param("id") commentId: number) {}

  @Delete(":id")
  @ApiOperation({
    summary: "댓글 삭제",
    description: "해당 id값에 해당하는 댓글을 삭제합니다.",
  })
  async deleteCommentByPost(@Param("id") postId: number) {}
}
