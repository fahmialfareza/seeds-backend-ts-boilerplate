import { CommentModel } from '@/models/comments.model';
import { convertPostHashtag } from '@/utils/util';
import DB from '@databases';

class CommentService {
  public async getCommentsByIdPost(idPost: number) {
    return DB.Comments.findAll({
      where: {
        idPost: idPost,
      },
    });
  }

  public async createComment(comment: CommentModel) {
    const post = await DB.Posts.findByPk(comment.idPost);
    if (!post) {
      return 'Post that you commented is not found';
    }

    if (comment.replyOn) {
      const findComment = await DB.Comments.findByPk(comment.replyOn);
      if (!findComment) {
        return 'Comment that you reply does not found';
      }
    }

    const commentContent = convertPostHashtag(comment.comment);
    comment.comment = commentContent;

    return DB.Comments.create(comment);
  }
}

export default CommentService;
