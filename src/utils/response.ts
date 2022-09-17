import { Response } from 'express';
import { IResponseSuccess } from '@/interfaces/utils.interface';

const success = (res: Response, { status = 200, message = 'success', data = null }: IResponseSuccess) => {
  res.status(200).json({
    statusCode: status,
    success: true,
    data,
    message,
  });
};

export default { success };
