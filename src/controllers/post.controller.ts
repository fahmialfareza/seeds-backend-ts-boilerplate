import { NextFunction, Response } from 'express';
import response from '@/utils/response';
import PostService from '@/services/post.service';
import { PostModel } from '@/models/posts.model';
import { UserModel } from '@/models/users.model';
import { HttpException } from '@/exceptions/HttpException';

class PostController {
  public postService = new PostService();

  public getAllPosts = async (req: any, res: Response, next: NextFunction) => {
    try {
      const data = await this.postService.getAllPosts();
      response.success(res, {
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  public getPostByHastag = async (req: any, res: Response, next: NextFunction) => {
    try {
      const hashtag = req.params.hashtag as string;

      const data = await this.postService.getPostsByHastag(hashtag);
      response.success(res, {
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  public getPost = async (req: any, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as number;

      const data = await this.postService.getPost(id);
      if (!data) {
        return next(new HttpException(404, 'Post is not found'));
      }

      response.success(res, {
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  public createPost = async (req: any, res: Response, next: NextFunction) => {
    try {
      const user = req.user as UserModel;
      const post = req.body as PostModel;
      post.idUser = user.id;

      const data = await this.postService.createPost(post);
      response.success(res, {
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
