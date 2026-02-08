# 💬 Comments App Frontend

SPA додаток на **React 19 + Vite** для взаємодії з Comments App API.  
Підтримує створення ниткоподібних коментарів, прикріплення файлів, пагінацію та CAPTCHA.

---

## 🚀 Tech Stack

- **React 19**
- **Vite** (швидкий dev server + HMR)
- **React Router (опціонально)**
- **Axios / fetch** для запитів до API
- **Zod** для валідації форм (опціонально)
- **Tailwind CSS** (або будь-який інший UI фреймворк)
- **Docker / Docker Compose** (опціонально)

---

## 📂 Структура Проекту

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
README_UA.md


---

## ⚙ Змінні оточення

Створіть файл `.env` у корені проекту:

```bash
VITE_API_URL=https://comments-app-api.onrender.com
Вказує на URL вашого бекенд API. Можна використовувати локальний сервер (http://localhost:3000) або деплой на Render.

🏃‍♂️ Запуск Проекту
🐳 З Docker (опціонально)
# 1. Build frontend Docker image
docker build -t comments-frontend .

# 2. Run container (port 3001)
docker run -it -p 3001:3000 comments-frontend
💻 Без Docker
# 1. Встановити залежності
npm install

# 2. Запустити dev сервер
npm run dev

# 3. Відкрити в браузері
http://localhost:3001
✨ Фічі
Створення коментарів із валідацією

Підтримка reply (threaded comments)

Пагінація та сортування

Завантаження файлів (файли надсилаються на бекенд)

CAPTCHA перевірка (серверна заглушка)

XSS захист через серверну санітизацію

Швидкий HMR через Vite

Автоматичний рендер reply коментарів у CommentList

🧩 Приклад Використання
CommentForm:

<CommentForm
  parentId={null}
  onSuccess={() => console.log('Comment created!')}
/>
Отримання коментарів:

import { getComments } from '../api/commentsApi'

const { comments, totalPages } = await getComments(1)
📝 Примітки
Бекенд API може працювати локально (http://localhost:3000) або на Render (https://comments-app-api.onrender.com)

URL API можна змінити через .env

Swagger UI для тестування: https://comments-app-api.onrender.com/api-docs

Reply коментарі підтягуються автоматично у компоненті CommentList

🛠 Рекомендований Workflow
Створюйте нову гілку для кожної фічі або виправлення

Коміт і пуш змін до GitHub

Зливайте у main або develop після перевірки

Використовуйте Docker для тестування фронтенду разом із бекендом

