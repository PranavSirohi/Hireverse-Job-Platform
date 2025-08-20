🚀 **Hireverse** – Job Connect Portal (MERN Stack)

Hireverse is a full-featured job portal built with the MERN stack (MongoDB, Express.js, React.js, Node.js).
It provides a seamless platform where job seekers can explore and apply for opportunities, while recruiters can post and manage job listings efficiently.

✨ **Features**

🔐 Secure Authentication – Role-based authentication for job seekers and recruiters using JWT.

💼 Job Listings – Browse and search from a wide range of job opportunities stored in MongoDB Atlas.

📑 Application Management –

Job Seekers: Apply to jobs and track application status.

Recruiters: Manage job postings and view received applications.

📱 Responsive Design – Fully optimized for desktop, tablet, and mobile.

☁️ Image Uploads – Integrated with Cloudinary for storing and managing images (e.g., company logos).

🌍 Deployment Ready – Hosted using Vercel (frontend), Render (backend), and MongoDB Atlas (database).

🛠️ **Tech Stack**

Frontend: React+vite, React Router, Bootstrap
Backend: Node.js, Express.js, MongoDB
Authentication: JWT (JSON Web Tokens), Bcrypt.js
Cloud Storage: Cloudinary
Deployment: Vercel, Render, MongoDB Atlas

⚡ **Getting Started**

Follow the steps below to run the project locally:

✅ **Prerequisites**

Node.js
 (v22.2.0 or later)

MongoDB Atlas
 account (or local MongoDB instance)

Cloudinary
 account

📥 **Installation**

**Install dependencies**

# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev


**Set up environment variables**
Create a config folder inside the backend directory and add a config.env file with the following:

PORT=5000
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
FRONTEND_URL=http://localhost:5173
DB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRE=5d
COOKIE_EXPIRE=7


⚡ If you don’t want to change .env credentials, skip this step.

Run the backend

cd backend
node server.js


Run the frontend

cd frontend
npm run dev


Open your browser and navigate to 👉 http://localhost:5173

📌 **Show Your Support**

If you like this project, please ⭐ star the repository – it really helps!

Here’s how I suggest we include it:

🚀 Hireverse – Job Connect Portal (MERN Stack)

... (same content as before)

🏗️ **Project Architecture**

Here’s a high-level overview of how Hireverse works:

flowchart TD
    A[Job Seeker / Recruiter] -->|Request| B[Frontend (React + Vite)]
    B -->|API Calls (Axios/Fetch)| C[Backend (Node.js + Express.js)]
    C -->|Queries| D[MongoDB Atlas Database]
    C -->|Image Uploads| E[Cloudinary]
    B -->|Built & Deployed on| F[Vite + Vercel]
    C -->|Deployed on| G[Render]

    style A fill:#f9f9f9,stroke:#333,stroke-width:1px
    style B fill:#61dafb,stroke:#333,stroke-width:1px
    style C fill:#68a063,stroke:#333,stroke-width:1px
    style D fill:#13aa52,stroke:#333,stroke-width:1px
    style E fill:#f5c542,stroke:#333,stroke-width:1px
    style F fill:#000,stroke:#333,stroke-width:1px,color:#fff
    style G fill:#4a90e2,stroke:#333,stroke-width:1px



**This diagram shows:**

👩‍💻 Users interact with the React.js + vite frontend.

⚡ The frontend communicates with the Express.js backend via REST APIs.

📂 Backend handles data storage in MongoDB Atlas.

☁️ Images (like resumes, company logos) are stored on Cloudinary.

🚀 Frontend is deployed on Vercel, backend on Render.
