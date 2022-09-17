import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IUser } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<
  IUser,
  'id' | 'idWallet' | 'phone' | 'email' | 'avatar' | 'seedsTag' | 'seedsName' | 'otp' | 'pin' | 'countPost' | 'countFollowers' | 'countFollowings'
>;

export class UserModel extends Model<IUser, UserCreationAttributes> implements IUser {
  public id: number;
  public idWallet: number;
  public phone: string;
  public email: string;
  public avatar: string;
  public seedsTag: string;
  public seedsName: string;
  public otp: string;
  public pin: string;
  public countPost: number;
  public countFollowers: number;
  public countFollowings: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idWallet: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      avatar: {
        allowNull: true,
        type: DataTypes.STRING(25),
      },
      seedsTag: {
        allowNull: true,
        type: DataTypes.STRING(25),
      },
      seedsName: {
        allowNull: true,
        type: DataTypes.STRING(150),
      },
      otp: {
        allowNull: true,
        type: DataTypes.STRING(6),
      },
      pin: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      countPost: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      countFollowers: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      countFollowings: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  return UserModel;
}
