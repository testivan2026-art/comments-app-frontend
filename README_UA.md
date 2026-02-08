# 💬 Comments App Frontend

SPA додаток на **React + Vite** для взаємодії з Comments App API.  
Підтримує створення ниткоподібних коментарів, прикріплення файлів, пагінацію та CAPTCHA.

---

## 🚀 Tech Stack

- **React 18**
- **Vite** (швидкий dev server + HMR)
- **React Router (опціонально)**
- **Axios / fetch** для запитів до API
- **Zod** для валідації форм
- **Tailwind CSS** (або будь-який інший UI фреймворк за бажанням)
- **Docker / Docker Compose** (опціонально)

---

## 📂 Project Structure


public/
src/
├─ api/
│ ├─ commentsApi.js
│ └─ handleApi.js
├─ components/
│ ├─ CommentForm.jsx
│ ├─ CommentList.jsx
│ └─ CommentItem.jsx
├─ pages/
│ └─ Home.jsx
├─ styles/
│ └─ index.css
├─ App.jsx
├─ main.jsx
└─ ...
package.json
vite.config.js
.env
.env.production
README.md

---

## ⚙ Environment Variables

Створіть файл `.env` у корені проекту:
VITE_API_URL=http://localhost:3000


> Вказує на URL вашого бекенд API.

---

## 🏃‍♂️ Run Project

### 🐳 With Docker (optional)
```bash
# 1. Build frontend Docker image
docker build -t comments-frontend .

# 2. Run container (port 3001)
docker run -it -p 3001:3000 comments-frontend

Without Docker
# 1. Install dependencies
npm install


# 2. Start dev server
npm run dev


# 3. Open in browser
http://localhost:3001


Features

Створення коментарів із валідацією

Підтримка reply (threaded comments)

Пагінація та сортування коментарів

Завантаження файлів (файли надсилаються на бекенд)

CAPTCHA перевірка (серверна заглушка)

XSS захист через серверну санітизацію

React HMR через Vite для швидкого девелопменту


Example Usage

CommentForm:

<CommentForm
  parentId={null}
  onSuccess={() => console.log('Comment created!')}
/>

Fetching Comments:

import { getComments } from '../api/commentsApi'


const { comments, totalPages } = await getComments(1)


Notes

API повинен бути запущений на http://localhost:3000.

У .env можна змінити URL бекенду (VITE_API_URL).

Для швидкого тестування використовуйте Swagger UI бекенду: http://localhost:3000/api-docs

Коментарі з reply підтягуються автоматично у компоненті CommentList.


Recommended Workflow

Створюйте нову гілку для фічі або виправлення.

Коміт і пуш змін до GitHub.

Після перевірки зливайте у main або develop.

Використовуйте Docker для локального тестування разом із бекендом.