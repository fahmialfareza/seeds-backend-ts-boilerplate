import { NextFunction, Response } from 'express';
import response from '@/utils/response';
import CommentService from '@/services/comment.service';
import { CommentModel } from '@/models/comments.model';
import { UserModel } from '@/models/users.model';
import { HttpException } from '@/exceptions/HttpException';

class CommentController {
  public commentService = new CommentService();

  public getCommentByIdPost = async (req: any, res: Response, next: NextFunction) => {
    try {
      const idPost = req.params.idPost as number;

      const data = await this.commentService.getCommentsByIdPost(idPost);
      response.success(res, {
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  public createComment = async (req: any, res: Response, next: NextFunction) => {
    try {
      const user = req.user as UserModel;
      const comment = req.body as CommentModel;
      comment.idUser = user.id;

      const data = await this.commentService.createComment(comment);
      if (typeof data == 'string') {
        return next(new HttpException(400, data));
      }
      response.success(res, {
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CommentController;
