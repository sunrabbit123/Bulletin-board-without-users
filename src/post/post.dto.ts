import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDTO {
  @ApiProperty({ description: "타이틀" })
  title: string;

  @ApiProperty({ description: "내용" })
  content: string;

  @ApiProperty({ description: "태그들 통 스트링" })
  tags: string;
}

export class PatchPostDTO extends CreatePostDTO {}

export class PostDTO extends CreatePostDTO {
  @ApiProperty({ description: "게시물 고유 값" })
  id: number;
}
