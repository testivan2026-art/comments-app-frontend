const API_URL = import.meta.env.VITE_API_URL

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw { status: response.status, message: data.message }
  }

  return data
}

export function getComments(page = 1) {
  return apiRequest(`/comments?page=${page}`)
}

export function createComment(data) {
  return apiRequest('/comments', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}