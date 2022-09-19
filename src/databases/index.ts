import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, DB_SCHEMA } from '@config';
import { logger } from '@utils/logger';
import UserModel from '@/models/users.model';
import PostModel from '@/models/posts.model';
import CommentModel from '@/models/comments.model';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  timezone: '+07:00',
  schema: DB_SCHEMA,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

const DB = {
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
  Users: UserModel(sequelize),
  Posts: PostModel(sequelize),
  Comments: CommentModel(sequelize),
};

export default DB;
