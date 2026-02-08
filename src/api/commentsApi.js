const API_URL = import.meta.env.VITE_API_URL

export async function getComments(page = 1, sort = {}) {
  const params = new URLSearchParams({
    page,
    limit: 25,
    sortField: sort.field || 'created_at',
    sortOrder: sort.order || 'DESC'
  })

  const res = await fetch(`${API_URL}/comments?${params}`)
  if (!res.ok) throw new Error('Failed to fetch comments')
  return res.json()
}

export async function createComment(formData) {
  const res = await fetch(`${API_URL}/comments/with-file`, {
    method: 'POST',
    body: formData
  })

  if (!res.ok) throw new Error('Failed to create comment')
  return res.json()
}