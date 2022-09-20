import { PostModel } from '@/models/posts.model';
import DB from '@databases';
import { Op } from 'sequelize';
import { convertPostHashtag } from '@/utils/util';

class PostService {
  public async getAllPosts() {
    const posts = (await DB.Posts.findAll()).map(post => {
      post.content = convertPostHashtag(post.content);
      return post;
    });

    return posts;
  }

  public async getPostsByHastag(tag: string) {
    const posts = (
      await DB.Posts.findAll({
        where: {
          content: {
            [Op.iLike]: `%#${tag}%`,
          },
        },
      })
    ).map(post => {
      post.content = convertPostHashtag(post.content);
      return post;
    });

    return posts;
  }

  public async getPost(id: number) {
    const post = await DB.Posts.findByPk(id);
    post.content = convertPostHashtag(post.content);

    return post;
  }

  public async createPost(post: PostModel) {
    return DB.Posts.create(post);
  }
}

export default PostService;
