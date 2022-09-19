import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import PostController from '@/controllers/post.controller';
import authMiddleware, { authMiddlewareNotRequired } from '@/middlewares/auth.middleware';

class PostRoute implements Routes {
  public path = '/api/v1/posts';
  public router = Router();
  public postController = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddlewareNotRequired, this.postController.getAllPosts);
    this.router.post(`${this.path}`, authMiddleware, this.postController.createPost);
    this.router.get(`${this.path}/:id`, authMiddlewareNotRequired, this.postController.getPost);
    this.router.get(`${this.path}/tag/:hashtag`, authMiddlewareNotRequired, this.postController.getPostByHastag);
  }
}

export default PostRoute;
