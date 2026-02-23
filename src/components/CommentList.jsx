import { useEffect, useState } from "react";
import { getComments } from "../api/commentsApi";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

export default function CommentList() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const data = await getComments();

      // normalize backend response
      if (data?.rows) setComments(data.rows);
      else if (data?.comments) setComments(data.comments);
      else if (Array.isArray(data)) setComments(data);
      else setComments([]);
    } catch (err) {
      console.error("Failed to load comments:", err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!comments.length) return <p>No comments yet.</p>;

  return (
    <div>
      {/* Топ-коментарі через CommentForm */}
      <CommentForm
        parentId={null}
        onSuccess={(newComment) => setComments(prev => [newComment, ...prev])}
      />

      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onReplySuccess={fetchComments} // відповіді можна оновлювати через fetch
        />
      ))}
    </div>
  );
}