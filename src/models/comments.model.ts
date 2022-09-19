import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IComment } from '@interfaces/comments.interface';

export type CommentCreationAttributes = Optional<IComment, 'id' | 'idUser' | 'idPost' | 'comment' | 'commentedOn'>;

export class CommentModel extends Model<IComment, CommentCreationAttributes> implements IComment {
  public id: number;
  public idUser: number;
  public idPost: number;
  public comment: string;
  public commentedOn: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CommentModel {
  CommentModel.init(
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
      idPost: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      comment: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      commentedOn: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'comments',
      sequelize,
    },
  );

  return CommentModel;
}
