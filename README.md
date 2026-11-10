# smart-school-management

 # 🏫 School Management System

A full-stack **School Management System** built to digitally manage students, teachers, attendance, timetable, examinations, results, classes, and school events.

## 🚀 Features

### 👨‍🎓 Student Management

* Add students
* Automatically generate Student ID
* View student details
* Remove students
* View student attendance
* View student results

### 👨‍🏫 Teacher Management

* Add teachers
* Automatically generate Teacher ID
* View teacher details
* Remove teachers
* Assign teachers to subjects/classes
* Assign class teachers

### 📊 Attendance

* Mark student attendance
* Track attendance records
* View attendance percentage
* Attendance charts and statistics

### 🗓️ Timetable

* Create class timetable
* Assign subjects and teachers
* View class-wise timetable

### 📝 Results

* Enter student marks
* View subject-wise results
* Display student performance

### 📸 Events

* Add school events
* Upload event photos
* View event gallery

### 🔐 Authentication

* User registration and login
* JWT authentication
* Role-based access
* Protected routes

---

## 🏗️ Project Structure

```text
school-management-system/
│
├── admin/       # Admin Dashboard
├── frontend/    # Frontend Application
├── backend/     # Backend API
│
└── README.md
```

## 🛠️ Technologies

**Frontend**

* React.js
* JavaScript
* HTML
* CSS
* Axios

**Backend**

* Node.js
* Express.js
* JWT
* REST API

**Database**

* MongoDB
* Mongoose

**Other**

* Cloudinary
* Git & GitHub

---

## Local setup

Use Node.js 24. Run `npm ci` separately in `backend`, `frontend`, and `admin`.
Create `backend/.env` with the variables below. Run `npm start` in
`backend`, `npm run dev` in `frontend`, and
`npm run dev -- --port 5174` in `admin`.

```dotenv
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/smart-school-management
JWT_SECRET=replace_with_a_long_random_secret
ADMIN_EMAIL=replace_with_your_admin_email
ADMIN_PASSWORD=replace_with_a_unique_admin_password
CLOUDINARY_NAME=replace_with_cloud_name
CLOUDINARY_API_KEY=replace_with_api_key
CLOUDINARY_SECRET_KEY=replace_with_api_secret
```

## Deploy on Vercel

Import the same GitHub repository into three Vercel projects. Select
Node.js 24.x for each project.

| Project | Root directory | Framework preset | Build settings |
| --- | --- | --- | --- |
| API | `backend` | Express | Keep the detected defaults |
| School website | `frontend` | Vite | `npm run build`, output `dist` |
| Admin panel | `admin` | Vite | `npm run build`, output `dist` |

1. Set the backend environment variables from the example above in the API
   project's Production environment. Use a reachable MongoDB URI. Vercel
   supplies the runtime port.
2. Deploy the API and open `/api/health` on its assigned domain to check that
   the Express app responds.
3. Set `VITE_API_URL` to the API origin, such as
   `https://your-school-api.vercel.app`, in both Vite projects. Deploy both.
4. Set the API project's `CORS_ORIGINS` to the two web app origins separated by
   a comma, then redeploy the API. Include the exact scheme and domain without
   a trailing slash. Sign in to each app to verify database connectivity.
5. Sign out, then reload a nested browser route and check that the app opens
   its login screen. Verify a small upload using a test record.

Keep credentials in the Vercel environment settings. Rotate any previously used
demo credentials and signing keys. The API accepts photo requests up to
Vercel's 4.5 MB request limit. Keep the total image size at or below 4 MB to
leave room for multipart form fields.

### Existing accounts

Students and teachers sign in with the password assigned to their account.
A legacy account with a date-based password or a missing password hash needs a
reset before it can sign in. An authenticated admin can send a JSON `PUT`
request to `/api/admin/update-student/:id` with a `Password` field or
`/api/admin/update-teacher/:id` with a `password` field. Use the MongoDB
record ID and send the admin token in the `Authorization: Bearer` header.
Passwords need at least 12 characters and must fit within 72 UTF-8 bytes.

## 🔄 System Architecture

```text
        ┌──────────────┐
        │    Admin     │
        └──────┬───────┘
               │
        ┌──────▼───────┐
        │   Frontend   │
        └──────┬───────┘
               │
            REST API
               │
        ┌──────▼───────┐
        │   Backend    │
        └──────┬───────┘
               │
        ┌──────▼───────┐
        │   MongoDB    │
        └──────────────┘
```

---

## 📌 Main Modules

```text
Students
Teachers
Classes
Attendance
Timetable
Results
Events & Photos
Authentication
```

---

## 🚀 Future Enhancements

* Online fee management
* Parent dashboard
* Student ID card generation
* PDF report generation
* Online examinations
* Notifications
* Homework management
* Leave management

---

## 👨‍💻 Author

**Full-Stack School Management System**

Built for managing school operations through a centralized digital platform.

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

