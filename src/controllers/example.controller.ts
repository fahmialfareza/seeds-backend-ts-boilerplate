import { NextFunction, Response } from 'express';
import response from '@/utils/response';
import ExampleService from '@/services/example.service';

class ExampleController {
  public exampleService = new ExampleService();

  public healthCheck = async (req: any, res: Response, next: NextFunction) => {
    try {
      const data = await this.exampleService.healthCheck();
      response.success(res, {
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ExampleController;
