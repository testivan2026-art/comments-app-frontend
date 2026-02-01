import { useState } from 'react'
import { createComment } from '../api/commentsApi'
import { handleApi } from '../api/handleApi'

export default function CommentForm({ parentId = null, onSuccess }) {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    text: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await handleApi(
      createComment({ ...form, parentId }),
      'Sending comment...'
    )

    setForm({ userName: '', email: '', text: '' })
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        name="userName"
        placeholder="Your name"
        value={form.userName}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <textarea
        name="text"
        placeholder="Comment text"
        value={form.text}
        onChange={handleChange}
        required
      />

      <button type="submit">Send</button>
    </form>
  )
}