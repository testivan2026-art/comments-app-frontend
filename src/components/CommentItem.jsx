import { useState } from 'react'
import CommentForm from './CommentForm'

const API_URL = import.meta.env.VITE_API_URL

export default function CommentItem({ comment, onReplySuccess }) {
  const [showReply, setShowReply] = useState(false)

  return (
    <div className="comment">
      <div className="comment-header">
        {comment.User?.username} ({comment.User?.email})
      </div>

      <div dangerouslySetInnerHTML={{ __html: comment.text }} />

      {comment.Files?.[0] && comment.Files[0].type === 'image' && (
        <img
          src={`${API_URL}/${comment.Files[0].path}`}
          width="200"
        />
      )}

      <div className="comment-actions">
        <button onClick={() => setShowReply(!showReply)}>
          Reply
        </button>
      </div>

      {showReply && (
        <CommentForm
          parentId={comment.id}
          compact
          onSuccess={() => {
            setShowReply(false)
            onReplySuccess()
          }}
        />
      )}

      {comment.replies?.length > 0 && (
        <div className="reply">
          {comment.replies.map(r => (
            <CommentItem
              key={r.id}
              comment={r}
              onReplySuccess={onReplySuccess}
            />
          ))}
        </div>
      )}
    </div>
  )
}
