import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { IDataStoredInToken } from '@interfaces/auth.interface';

const authMiddleware = async (req: any, _res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('SeeDS ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = verify(Authorization, secretKey) as IDataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await DB.Users.findByPk(userId, {
        attributes: {
          exclude: ['pin', 'otp'],
        },
      });

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    console.log(error);
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export const authMiddlewareNotRequired = async (req: any, _res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('SeeDS ')[1] : null);
    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = verify(Authorization, secretKey) as IDataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await DB.Users.findByPk(userId, {
        attributes: {
          exclude: ['pin', 'otp'],
        },
      });

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

export default authMiddleware;
