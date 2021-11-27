import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  token: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
  })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments: Comment[];
}
