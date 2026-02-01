import { useState } from 'react'
import { createComment } from '../api/commentsApi'
import { handleApi } from '../api/handleApi'

export default function CommentForm({ parentId = null, onSuccess }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    text: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Відправляємо правильні ключі для бекенду
    await handleApi(
      createComment({ ...form, parent_id: parentId, captcha: 'test' }),
      'Sending comment...'
    )

    setForm({ username: '', email: '', text: '' })
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        name="username"
        placeholder="Your name"
        value={form.username}
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