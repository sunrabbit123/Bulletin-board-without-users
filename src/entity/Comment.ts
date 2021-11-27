import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from ".";
import { Post } from "./Post";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  user: User;
}
