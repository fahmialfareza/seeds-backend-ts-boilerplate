import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { UserModel } from '@models/users.model';
import { IDataStoredInToken } from '@interfaces/auth.interface';
import DB from '@databases';

class AuthService {
  public async register(user: UserModel) {
    return DB.Users.create(user);
  }

  public async login(phone: string, pin: string) {
    const findUser = await DB.Users.findOne({
      where: {
        phone,
        pin,
      },
    });

    return findUser;
  }

  public async generateToken(user: UserModel) {
    const payload: IDataStoredInToken = {
      id: user.id,
    };

    return sign(payload, SECRET_KEY);
  }
}

export default AuthService;
