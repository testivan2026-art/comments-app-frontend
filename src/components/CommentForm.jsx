import { useState } from 'react'
import { createComment } from '../api/commentsApi'

export default function CommentForm({ parentId, onSuccess, compact = false }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    text: '',
    file: null
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fd = new FormData()
    fd.append('username', form.username)
    fd.append('email', form.email)
    fd.append('text', form.text)
    if (parentId) fd.append('parent_id', parentId)
    if (form.file) fd.append('file', form.file)

    await createComment(fd)

    setForm({ username: '', email: '', text: '', file: null })
    onSuccess?.()
  }

  return (
    <form className={compact ? 'comment-form compact' : 'comment-form'} onSubmit={handleSubmit}>
      {!compact && <h2>Add comment</h2>}

      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <textarea
        placeholder="Text"
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      />

      <input
        type="file"
        onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
      />

      <button type="submit">Send</button>
    </form>
  )
}