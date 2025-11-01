# Redeem System

A modern full-stack web application for generating, managing, and redeeming unique or common codes. Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **ShadCN UI**, and **MongoDB**, this solution features role-based access, JWT authentication, beautiful UI, robust backend, and complete code management workflows.

---

## 🔥 Features & Requirements

- **User Authentication (JWT)**: Secure login and protected routes, supporting admin and user roles.
- **Admin Dashboard**: 
  - Create "common" and "unique" redeem codes.
  - Table displaying redemption history, code status, expiry, and redemption limits.
  - Admin-only access (Role-Based Access Control).
- **Redemption Workflow**:
  - Users redeem codes, limited by type and status.
  - Codes cannot be redeemed after expiry or after redemption limit is reached (for common codes).
- **Responsive UI**: Built with ShadCN UI & Tailwind v4, fully responsive and visually appealing.
- **TypeScript everywhere**: Strictly typed models, API, and React components.
- **Secure Backend**: Modular, clean, scalable; follows Next.js 16 best practices in `src` directory structure.

---

## 🧑‍🚀 Getting Started (Local Development)

1. **Clone the repo:**

     git clone [https://github.com/AdnanGhani07/redeem-system](https://github.com/AdnanGhani07/redeem-system)
  
     cd redeem-system

2. **Install dependencies:**

     npm install

3. **Setup environment variables:**

     Create `.env.local` in the project root:

       MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
       JWT_SECRET=your-super-secret-key

4. **Seed admin/user accounts:**

     npx ts-node scripts/seedAdminAndUser.ts

     Or manually create via MongoDB Compass.

5. **Start the development server:**

     npm run dev

6. **Open the app:**

     Go to [http://localhost:3000](http://localhost:3000)

---

## 📝 Demo Credentials

- **Admin**
  - Email: `admin@example.com`
  - Password: `adminpassword`
- **User**
  - Email: `user@demo.com`
  - Password: `userpassword`

*(Seeded with the provided script)*

---

## 🚦 Usage Guide

- **Landing page**: Overview, demo credentials, entry points.
- **Login/Register**: Authenticate as admin/user.
- **Admin dashboard**:
- Create codes (common/unique), set limits and expiry.
- Review redemption history and code statuses.
- Only admins can access this dashboard.
- **Redeem page**: Users enter codes, get instant feedback.
- **Authentication & Authorization**: All backend routes are protected by JWT and role.

---

## 🛠 Technology Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, ShadCN UI
- **Backend**: Next.js API routes, TypeScript, Mongoose (MongoDB), JWT
- **Database**: MongoDB Atlas (cloud recommended; local supported)
- **UI Components**: ShadCN, fully accessible and responsive
- **Testing**: Vitest/Jest/React Testing Library (optional for bonus)
- **Deployment**: Vercel recommended, supports environment variables

---

## 🌐 Deployment

1. **Push to GitHub.**
2. **Deploy on Vercel (or Render):**
    - Add `MONGODB_URI` and `JWT_SECRET` to environment variables in dashboard.
    - Visit your live site and test all flows.

---

## ✅ Assignment Deliverables & Evaluation Criteria

- Fulfills all required flows: code creation, redemption, expiry, limit, history.
- Role-based dashboard and route protection.
- Modern Next.js 16 App Router structure (`src` directory).
- TypeScript across backend and frontend.
- Beautiful, accessible UI with ShadCN UI and Tailwind CSS v4.
- Secure JWT authentication and modular backend.
- Clean documentation and clear demo/dev instructions.

---

## ✨ Bonus Features (optional, if implemented)

- Registration page for users.
- Logout flow, session awareness.
- Dark mode toggle.
- Editable/deletable codes.
- Unit/integration tests.
- Admin view for full redemption history.

---

## 🤝 Credits

Made by [Adnan Ghani]  
Powered by Next.js, MongoDB, TypeScript, and ShadCN UI.
