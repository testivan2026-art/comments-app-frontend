import { useEffect, useState } from 'react'
import { getComments } from '../api/commentsApi'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'

export default function Home() {
  const [comments, setComments] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const data = await getComments(page)

        if (!active) return

        setComments(data.comments)
        setTotalPages(data.totalPages)
      } catch {
        if (!active) return
        setError('Failed to load comments')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [page])

  const reload = async () => {
    try {
      setLoading(true)
      const data = await getComments(page)
      setComments(data.comments)
      setTotalPages(data.totalPages)
    } catch {
      setError('Failed to reload comments')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h2>Add comment</h2>

      <CommentForm onSuccess={reload} />

      <h2>List</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {!loading && (
        <CommentList comments={comments} onReplySuccess={reload} />
      )}

      <div style={{ marginTop: 20 }}>
        <button disabled={page === 1 || loading} onClick={() => setPage(p => p - 1)}>
          Prev
        </button>

        <span style={{ margin: '0 10px' }}>
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages || loading}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </>
  )
}