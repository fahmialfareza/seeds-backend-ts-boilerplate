import { NextFunction, Response } from 'express';
import response from '@/utils/response';
import AuthService from '@/services/auth.service';
import { UserModel } from '@/models/users.model';
import { HttpException } from '@/exceptions/HttpException';

class AuthController {
  public authService = new AuthService();

  public register = async (req: any, res: Response, next: NextFunction) => {
    try {
      const user = req.body as UserModel;

      const data = await this.authService.register(user);
      const token = await this.authService.generateToken(data);

      response.success(res, {
        data: {
          user: data,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: any, res: Response, next: NextFunction) => {
    try {
      const phone = req.body.phone as string;
      const pin = req.body.pin as string;

      const data = await this.authService.login(phone, pin);
      if (!data) {
        return next(new HttpException(401, 'Phone or pin is wrong'));
      }

      const token = await this.authService.generateToken(data);

      response.success(res, {
        data: {
          user: {
            phone: data.phone,
          },
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
