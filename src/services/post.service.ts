import { PostModel } from '@/models/posts.model';
import DB from '@databases';
import { Op } from 'sequelize';
import { convertPostHashtag } from '@/utils/util';

class PostService {
  public async getAllPosts() {
    return DB.Posts.findAll();
  }

  public async getPostsByHastag(tag: string) {
    return DB.Posts.findAll({
      where: {
        content: {
          [Op.iLike]: `%#${tag}%`,
        },
      },
    });
  }

  public async getPost(id: number) {
    const post = await DB.Posts.findByPk(id);
    return post;
  }

  public async createPost(post: PostModel) {
    const content = convertPostHashtag(post.content);
    post.content = content;

    return DB.Posts.create(post);
  }
}

export default PostService;
