Comments App Frontend

SPA додаток на React + Vite для взаємодії з Comments App API.
Підтримує створення ниткоподібних коментарів, прикріплення файлів, пагінацію та CAPTCHA.

🚀 Tech Stack

React 18

Vite (fast dev server + HMR)

React Router (optional)

Axios / fetch for API requests

Zod for form validation (optional)

Tailwind CSS or any UI framework

Docker / Docker Compose (optional)

📂 Project Structure
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

⚙ Environment Variables

Create a .env file in the project root:

VITE_API_URL=http://localhost:3000

Points to your backend API URL.

🏃‍♂️ Run Project
🐳 With Docker (optional)
# Build frontend image
docker build -t comments-frontend .


# Run container (port 3001)
docker run -it -p 3001:3000 comments-frontend
💻 Without Docker
# Install dependencies
npm install


# Start dev server
npm run dev


# Open in browser
http://localhost:3001
✨ Features

Create comments with validation

Threaded replies (nested comments)

Pagination and sorting

File uploads (sent to backend)

CAPTCHA support (server-side mock)

XSS protection via backend sanitization

Fast HMR via Vite

🧩 Example Usage
CommentForm
<CommentForm
  parentId={null}
  onSuccess={() => console.log('Comment created!')}
/>


Fetching Comments
import { getComments } from '../api/commentsApi'

const { comments, totalPages } = await getComments(1)


📝 Notes

Backend API must run on: http://localhost:3000

API URL can be changed via .env

Swagger UI for testing: http://localhost:3000/api-docs

Reply comments are rendered automatically in CommentList

🛠 Recommended Workflow

Create a new branch for each feature or fix

Commit and push changes to GitHub

Merge into main or develop after review

Use Docker to test frontend + backend together