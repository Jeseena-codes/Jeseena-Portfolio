# Jeseena J — Full-Stack Developer Portfolio

A modern, responsive, full-stack personal portfolio website designed for **Jeseena J (Full Stack Developer)**. Built with an editorial dark aesthetic, deep crimson accents (`#8B0000` / `#B00020`), fine typography, smooth scroll reveals, dynamic REST APIs, MySQL persistence, and a private **Django Admin** content management panel.

---

## 🏗️ Architecture & Data Flow

```
YOU (In Private Django Admin)
  ↓ http://127.0.0.1:8000/admin/
+-------------------------------------------------------------+
|                     Django Admin Panel                      |
|  - About Profile: Name, Title, Intro, Bio, Photo, Socials   |
|  - What I Do: 6 Technical Capabilities, Descriptions, Tech  |
|  - Skills: 11 Core Tech Skills with Proficiency Percentages  |
|  - Journey: 4 Education & Career Milestones, Display Order   |
|  - Projects: Title, Desc, Tech, Features, Screenshot, URLs  |
|  - Contact Messages: Visitor Submissions, Read/Unread State |
+-------------------------------------------------------------+
                              |
                         Django ORM
                              v
+-------------------------------------------------------------+
|                  MySQL Database (Port 3307)                 |
|  - portfolio_db: api_about, api_service, api_skill,         |
|                  api_journey, api_project,                  |
|                  api_contactmessage                         |
+-------------------------------------------------------------+
                              |
                     Django REST Framework
                              v
+-------------------------------------------------------------+
|                 REST API (JSON Endpoints)                   |
|  - GET  /api/about/        (Personal profile & photo URL)   |
|  - GET  /api/services/     (6 What I Do capabilities)       |
|  - GET  /api/skills/       (11 skills with proficiencies)   |
|  - GET  /api/journey/      (4 Education/career milestones)  |
|  - GET  /api/projects/     (Featured & all projects)        |
|  - POST /api/contact/      (Contact form submissions)       |
|  - GET  /api/health/       (Database & API health monitor)  |
+-------------------------------------------------------------+
                              |
                     React fetch() on Load
                              v
+-------------------------------------------------------------+
|                  Public React Portfolio                     |
|  - http://localhost:3000/                                   |
|  - Hero, About, Skills, Projects, Journey, Process, Contact |
+-------------------------------------------------------------+
```

---

## 🚀 Quick Start (Local Setup)

### 1. Database Setup & Seeding (Run once)
```powershell
python setup_database.py
```
This script:
1. Connects to MySQL on `127.0.0.1:3307`.
2. Creates the `portfolio_db` database if not present.
3. Applies Django migrations for all models.
4. Seeds initial profile information, CareNova, JobBizz, skills, journey, and process steps.

### 2. Create Your Admin Superuser Login
You can create your personal administrator login credentials with:
```powershell
cd d:\portfolio\backend
python manage.py createsuperuser
```
Enter your desired username, email, and password.

### 3. Launch Django Backend
Double-click `run_backend.bat` or run:
```powershell
cd d:\portfolio\backend
python manage.py runserver 127.0.0.1:8000
```
- **Public API Root**: `http://127.0.0.1:8000/api/`
- **Private Admin**: `http://127.0.0.1:8000/admin/`

### 4. Launch React Frontend
Double-click `run_frontend.bat` or run:
```powershell
cd d:\portfolio\frontend
python -m http.server 3000
```
*(Or `npm run dev` if Node.js is installed)*
- **Public Portfolio URL**: `http://localhost:3000/`

---

## 🔑 How to Manage Content in Django Admin

Open **`http://127.0.0.1:8000/admin/`** and log in with your superuser account.

### 1. ABOUT ME PROFILE (`/admin/api/about/`)
- **Name & Title**: Change your name or professional title (*Full Stack Developer*).
- **Hero & About Text**: Edit your elevator pitch or detailed story.
- **Quote**: Modify the quote shown in the editorial card.
- **Profile Photo**: Click **Choose File** under *Profile Photo Upload* to upload your portrait.
  - Django automatically saves it into `backend/media/profile/`.
  - The API returns the full URL, and your React hero section immediately displays your photo!
- **Social Links & Location**: Update GitHub, LinkedIn, Email, or Location.
- **Stats**: Modify your age or project counts.

### 2. PROJECTS (`/admin/api/project/`)
- **Add New Project**: Click **+ Add Project**.
- **Fields**: Title, subtitle, project number (`01`, `02`, `03`...), description, technologies (comma-separated), features (one per line).
- **Screenshot**: Upload an image under the *Image* field.
- **Links**: Add GitHub repo URL and Live Demo URL.
- **Featured**: Check or uncheck to control whether it appears on the homepage.
- **Order**: Reorder projects using integer numbers (`1`, `2`, `3`...).

### 3. SKILLS (`/admin/api/skill/`)
- Add, edit, or delete skills.
- Assign categories: `Frontend Development`, `Backend Development`, `Database Systems`, `Tools & Platforms`.
- Reorder display order.

### 4. JOURNEY / EDUCATION (`/admin/api/journey/`)
- Add new milestones (e.g. `2026`, `Certified Cloud Practitioner`, description).
- Drag or reorder with integer order.

### 5. WORK PROCESS (`/admin/api/workprocess/`)
- Manage steps `01`, `02`, `03`, `04`, `05` or add additional methodology steps.

### 6. CONTACT MESSAGES (`/admin/api/contactmessage/`)
- Real-time list of inquiries sent from the public website contact form.
- Shows sender's Name, Email, Subject, Message, and Date.
- Action to **Mark selected messages as Read** or **Unread**.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/about/` | Returns About profile, narrative, social links & photo URL |
| `GET` | `/api/projects/` | Returns featured and all portfolio projects |
| `GET` | `/api/skills/` | Returns technical skills grouped by category |
| `GET` | `/api/journey/` | Returns education and career journey milestones |
| `GET` | `/api/work-process/` | Returns 5-step work process methodology |
| `POST` | `/api/contact/` | Receives contact submissions and saves to MySQL |
| `GET` | `/api/health/` | Health check reporting Django status and MySQL connection |

---

## 🔒 Security & CORS

- `SECRET_KEY` is loaded securely from `DJANGO_SECRET_KEY` environment variable (with fallback for local development).
- CORS is explicitly restricted to `http://localhost:3000` and `http://127.0.0.1:3000` in `settings.py`.
- `MEDIA_URL` is set to `/media/` and served locally during development via `urls.py`.

---

## 🌐 Production Deployment

- **Backend (Django + MySQL)**:
  - Host on Render, Railway, or VPS (Ubuntu + Nginx + Gunicorn + MySQL).
  - Set `DEBUG = False`, define `DJANGO_SECRET_KEY` and `ALLOWED_HOSTS`.
  - Admin panel is accessible at `https://yourdomain.com/admin/`.
- **Frontend (React)**:
  - Deploy to Vercel, Netlify, or serve built bundle directly through Django/Nginx.
  - Update `API_BASE_URL` in `frontend/src/services/api.js` to your backend URL.
