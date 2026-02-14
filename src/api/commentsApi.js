const API_URL = import.meta.env.VITE_API_URL;

// ===========================
// CAPTCHA
// ===========================
export async function getCaptcha() {
  try {
    const res = await fetch(`${API_URL}/captcha`, {
      method: 'GET',
      credentials: 'include'
    })
    if (!res.ok) throw new Error(`Failed to load captcha: ${res.status}`)
    return res.text()
  } catch (err) {
    console.error('Captcha load error:', err)
    throw err
  }
}

// ===========================
// COMMENTS
// ===========================
export async function getComments(page = 1, sort = {}) {
  const params = new URLSearchParams({
    page,
    limit: 25,
    sortField: sort.field || 'created_at',
    sortOrder: sort.order || 'DESC',
  });

  const res = await fetch(`${API_URL}/comments?${params}`);
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}

// POST comment with optional file
export async function createComment(formData) {
  const res = await fetch(`${API_URL}/comments/with-file`, {
    method: 'POST',
    body: formData,
    credentials: 'include', // важливо для сесій/captcha
  });

  if (!res.ok) throw new Error('Failed to create comment');
  return res.json();
}
