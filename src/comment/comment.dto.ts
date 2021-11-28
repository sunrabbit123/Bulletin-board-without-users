import { ApiProperty } from "@nestjs/swagger";

import { PostDTO } from "../post/post.dto";
import { UserDTO } from "../user/user.dto";

export class BasicCommentDTO {
  @ApiProperty({ description: "고유 아이디값" })
  id?: number;

  @ApiProperty({ description: "댓글 내역" })
  content: string;
}

export class CommentContainsUserDTO extends BasicCommentDTO {
  @ApiProperty({ description: "유저" })
  user: UserDTO;
}

export class CommentContainsBothDTO extends CommentContainsUserDTO {
  @ApiProperty({ description: "게시물" })
  post: PostDTO;
}
