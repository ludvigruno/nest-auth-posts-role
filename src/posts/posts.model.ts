import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

interface PostCreationAttrs {
  userId: number;
  title: string;
  content: string;
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @Column({ type: DataType.STRING })
  image: string;

  //обязательно указать внешний ключ
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  //пост привязан к каому то пользователю
  @BelongsTo(() => User)
  author: User;
}
