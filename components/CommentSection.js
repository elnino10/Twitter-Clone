import Comment from "./Comment";

const CommentSection = ({ postId, comments }) => {
  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment.data()}
            commentId={comment.id}
            postId={postId}
          />
        ))}
    </div>
  );
};

export default CommentSection;
