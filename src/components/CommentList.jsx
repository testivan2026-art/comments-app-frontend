import CommentItem from './CommentItem';

export default function CommentList({ comments, onReplySuccess }) {
  return (
    <div>
      {comments.map(c => (
        <CommentItem key={c.id} comment={c} onReplySuccess={onReplySuccess} />
      ))}
    </div>
  );
}