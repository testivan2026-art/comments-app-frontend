import { useEffect, useState } from 'react'
import { getComments } from '../api/commentsApi'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import Loader from '../components/Loader'
import Error from '../components/Error'

export default function Home() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchComments = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getComments(1)
      setComments(data.comments ?? data)
    } catch (err) {
      setError(err.message || 'Failed to load comments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  if (loading) return <Loader />
  if (error) return <Error message={error} />

  return (
    <div>
      <h1>Comments</h1>
      <CommentForm onSuccess={fetchComments} />
      <CommentList comments={comments} />
    </div>
  )
}