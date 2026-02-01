export default function CommentItem({ comment }) {
  return (
    <div className="comment">
      <div className="comment-header">
        <strong>{comment.User?.username}</strong>
        <span>{comment.User?.email}</span>
      </div>

      <div
        className="comment-text"
        dangerouslySetInnerHTML={{ __html: comment.text }}
      />

      {comment.Files?.length > 0 && (
        <div className="comment-files">
          {comment.Files.map(file => (
            <a
              key={file.id}
              href={file.url || '#'}
              target="_blank"
              rel="noreferrer"
            >
              {file.original_name}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}