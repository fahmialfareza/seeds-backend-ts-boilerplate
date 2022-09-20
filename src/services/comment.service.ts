import { CommentModel } from '@/models/comments.model';
import { convertPostHashtag } from '@/utils/util';
import DB from '@databases';

class CommentService {
  public async getCommentsByIdPost(idPost: number) {
    const comments = (
      await DB.Comments.findAll({
        where: {
          idPost: idPost,
        },
      })
    ).map(comment => {
      comment.comment = convertPostHashtag(comment.comment);
      return comment;
    });

    return comments;
  }

  public async createComment(comment: CommentModel) {
    if (comment.replyOn) {
      const findComment = await DB.Comments.findByPk(comment.replyOn);
      if (!findComment) {
        return 'Comment that you reply does not found';
      }
      comment.idPost = findComment.idPost;

      return DB.Comments.create(comment);
    }

    const post = await DB.Posts.findByPk(comment.idPost);
    if (!post) {
      return 'Post that you commented is not found';
    }

    return DB.Comments.create(comment);
  }
}

export default CommentService;
