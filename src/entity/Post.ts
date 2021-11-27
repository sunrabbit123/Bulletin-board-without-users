import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  tags: string;

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  user: User;
}
