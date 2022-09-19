import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IPost } from '@interfaces/posts.interface';

export type PostCreationAttributes = Optional<IPost, 'id' | 'idUser' | 'title' | 'content'>;

export class PostModel extends Model<IPost, PostCreationAttributes> implements IPost {
  public id: number;
  public idUser: number;
  public title: string;
  public content: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof PostModel {
  PostModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idUser: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'posts',
      sequelize,
    },
  );

  return PostModel;
}
