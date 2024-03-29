import Comment from "./Comment";

const CommentSection = ({
  post,
  postId,
  comments,
  commentPanelShown,
  activePanelId,
  setActivePanelId,
  onHidePanel,
  onShowPanel,
}) => {
  return (
    <div onClick={onHidePanel}>
      {comments &&
        comments.map((comment) => (
          <Comment
            post={post}
            key={comment.id}
            comment={comment.data()}
            commentId={comment.id}
            postId={postId}
            onShowPanel={onShowPanel}
            onHidePanel={onHidePanel}
            panelShown={commentPanelShown}
            activePanelId={activePanelId}
            setActivePanelId={setActivePanelId}
          />
        ))}
    </div>
  );
};

export default CommentSection;
