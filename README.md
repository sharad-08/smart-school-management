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

The `frontend` app contains the public school website and all three role portals.
Use `/login` to choose Administrator, Teacher or Student. After login the app
opens `/admin`, `/teacher` or `/student`.

| Project | Root directory | Framework preset | Build settings |
| --- | --- | --- | --- |
| API | `backend` | Express | Keep the detected defaults |
| School website and shared portal | `frontend` | Vite | `npm run build`, output `dist` |

1. Set the backend environment variables from the example above in the API
   project's Production environment. Use a reachable MongoDB URI.
2. Set `VITE_API_URL` in the frontend project to the API origin, such as
   `https://smart-school-management-nb77.vercel.app`. Choose the Config variable type.
3. Set `CORS_ORIGINS` on the API project to the frontend origin. Additional
   allowed origins can be included, separated by commas.
4. Deploy the backend changes, then the frontend changes. Existing Vercel Git
   integrations deploy commits to `main` automatically.
5. Open the frontend's `/login`. Verify all three roles with test accounts.
   A teacher can save attendance, publish marks and send a class notice.
   A student sees their own saved records and notices in the portal.
6. Admins can search, filter, edit and export student and teacher records.
   Use the record editor's optional password reset field to reset an account.

The `admin` directory also provides the earlier standalone admin application.
The shared frontend includes the updated record editors and navigation.

### Data displayed by the portal

Attendance, marks, fee amounts, teacher assignments, notices and timetables
come from MongoDB. An empty state appears when a record is unavailable.
The fee page shows the school's recorded amounts and overall fee status.
Contact the school office for payments or receipts.

Class timetables follow the existing database model, with one schedule per
class. Teacher schedules are stored separately. New student and teacher IDs
include a random suffix to avoid count-based collisions.

Photo uploads use Cloudinary. Keep the combined image size at or below 4 MB
per request to leave room for multipart form fields within Vercel's 4.5 MB limit.

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

