export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <div>No comments</div>
  }

  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>
          <strong>{comment.User?.username}</strong>: {comment.text}
        </li>
      ))}
    </ul>
  )
}