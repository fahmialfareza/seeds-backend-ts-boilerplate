import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import CommentController from '@/controllers/comment.controller';
import authMiddleware, { authMiddlewareNotRequired } from '@/middlewares/auth.middleware';

class CommentRoute implements Routes {
  public path = '/api/v1/comments';
  public router = Router();
  public commentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authMiddleware, this.commentController.createComment);
    this.router.get(`${this.path}/:idPost`, authMiddlewareNotRequired, this.commentController.getCommentByIdPost);
  }
}

export default CommentRoute;
