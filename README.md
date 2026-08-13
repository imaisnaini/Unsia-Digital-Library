# 📚 UNSIA Digital Library (Fullstack MERN Application)

[![Frontend Deployment](https://img.shields.io/badge/Vercel-Frontend-black?logo=vercel)](https://unsia-digital-library.vercel.app)
[![Backend Deployment](https://img.shields.io/badge/Render-Backend-informational?logo=render)](https://unsia-digital-library-backend.onrender.com)

## 🌐 Live Access & Demo Production

Aplikasi ini telah di-deploy penuh ke lingkungan *production* dan siap diuji secara publik:

* **Frontend Application (Vercel):** [https://unsia-digital-library.vercel.app](https://unsia-digital-library.vercel.app)
* **Backend REST API (Render):** [https://unsia-digital-library-backend.onrender.com](https://unsia-digital-library-backend.onrender.com)

### 🔑 Akun Demo Pengujian (Test Credentials)
Untuk memudahkan proses pengujian aplikasi tanpa perlu mendaftar akun baru:
* **Email:** `admin@unsia.ac.id` (atau buat akun baru via halaman Register)
* **Password:** `password123`

---

## 📖 Deskripsi Proyek

**UNSIA Digital Library** adalah aplikasi sistem informasi perpustakaan digital berbasis **MERN Stack** (MongoDB, Express.js, React.js, Node.js). 

Aplikasi ini dirancang untuk memfasilitasi pengelolaan koleksi buku, data anggota/member, serta pencatatan transaksi peminjaman dan pengembalian buku secara terintegrasi dengan visualisasi statistik *real-time*.

---

## 👨‍🎓 Identitas Mahasiswa

| Keterangan     | Detail                               |
| -------------- | ------------------------------------ |
| **Nama**       | Fatimah Isnaini Shabrina             |
| **NIM**        | 250401020073                         |
| **Program Studi** | Informatika PJJ S1                |
| **Kelas**      | IF401                                |
| **Mata Kuliah**| Pemrograman Web 2                    |
| **Dosen Pengampu** | Ratih Titi Komala Sari, ST, MM, MMSI |
| **Semester**   | Genap 2025/2026                      |
| **Universitas**| Universitas Siber Asia (UNSIA)       |

---

## 💻 Tech Stack & Architecture

### **Backend (Node.js & Express)**
* **Node.js** & **Express.js** — Arsitektur RESTful API
* **MongoDB Atlas** & **Mongoose** — Database NoSQL Cloud & ODM
* **JSON Web Token (JWT)** & **Bcrypt.js** — Autentikasi Keamanan & Enkripsi Kata Sandi
* **Cors** & **Dotenv** — Pengaturan CORS Policy & Variabel Lingkungan
* **Deployment Platform:** Render

### **Frontend (React & Vite)**
* **React.js (Vite)** — Single Page Application (SPA) Framework
* **React Router DOM v6** — Routing Client-Side & Protected Routes
* **Axios** — HTTP Client untuk Integrasi Backend API
* **Chart.js** & **React-Chartjs-2** — Visualisasi Statistik Interaktif
* **CSS Modules / Modern Dark Theme** — Antarmuka Pengguna Responsif
* **Deployment Platform:** Vercel

---

## 📂 Struktur Proyek (Project Tree)

```text
UNSIA-DIGITAL-LIBRARY/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── dashboardController.js
│   │   ├── loanController.js
│   │   └── memberController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Book.js
│   │   ├── Loan.js
│   │   ├── Member.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── loanRoutes.js
│   │   └── memberRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Books.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Loans.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Members.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## 🚀 Fitur Utama

1. **Autentikasi & Keamanan Pengguna:**
   * Registrasi dan Login akun petugas/admin.
   * Enkripsi kata sandi menggunakan `bcryptjs`.
   * Manajemen sesi dan proteksi halaman menggunakan **JSON Web Token (JWT)**.
2. **Dashboard Interactive:**
   * Ringkasan kartu statistik *real-time* (Total Buku, Total Member, Peminjaman Aktif, dan Selesai).
   * Grafik Distribusi Buku per Kategori (*Doughnut Chart*).
   * Grafik Statistik Peminjaman (*Bar Chart*).
3. **Manajemen Koleksi Buku (CRUD):**
   * Tambah, lihat, sunting, dan hapus data buku.
   * Pembaruan stok buku secara otomatis saat transaksi peminjaman/pengembalian terjadi.
4. **Manajemen Anggota / Member (CRUD):**
   * Pengelolaan data anggota perpustakaan secara lengkap.
5. **Sistem Peminjaman & Pengembalian:**
   * Pencatatan transaksi peminjaman buku baru.
   * Fitur pengembalian buku dengan kalkulasi otomatis pembaruan status dan pengembalian stok.
6. **Error Handling & Routing Layout:**
   * Halaman kustom **404 Not Found** (`NotFound.jsx`).
   * Routing terlindungi (*Protected Routes*) yang mencegah akses halaman internal tanpa login.

---

## 🛠️ Panduan Instalasi Lokal (Local Development Setup)

### 1. Clone Repository
```bash
git clone https://github.com/imaisnaini/Unsia-Digital-Library.git
cd Unsia-Digital-Library
```

---

### 2. Setup Backend

1. Masuk ke folder `backend`:
   ```bash
   cd backend
   ```
2. Install dependensi modul:
   ```bash
   npm install
   ```
3. Buat file `.env` di dalam folder `backend/` dan sesuaikan nilainya:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/unsia_library
   JWT_SECRET=rahasia_jwt_unsia
   ```
4. Jalankan server backend lokal:
   ```bash
   npm run dev
   ```
   *(Backend akan berjalan di: `http://localhost:5000`)*

---

### 3. Setup Frontend

1. Buka terminal baru, lalu masuk ke folder `frontend`:
   ```bash
   cd frontend
   ```
2. Install dependensi modul:
   ```bash
   npm install
   ```
3. Buat file `.env` di dalam folder `frontend/`:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Jalankan aplikasi frontend lokal:
   ```bash
   npm run dev
   ```
   *(Frontend akan berjalan di: `http://localhost:5173`)*

---

## 📡 REST API Endpoints Overview

| Modul | Method | Endpoint | Deskripsi | Akses |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Mendaftar akun petugas baru | Publik |
| | `POST` | `/api/auth/login` | Login & mendapatkan Token JWT | Publik |
| **Dashboard**| `GET` | `/api/dashboard/summary` | Mengambil data statistik & grafik | Protected |
| **Books** | `GET` | `/api/books` | Mengambil daftar semua buku | Protected |
| | `POST` | `/api/books` | Menambahkan buku baru | Protected |
| | `PUT` | `/api/books/:id` | Memperbarui data buku | Protected |
| | `DELETE` | `/api/books/:id` | Menghapus data buku | Protected |
| **Members** | `GET` | `/api/members` | Mengambil daftar anggota | Protected |
| | `POST` | `/api/members` | Menambahkan anggota baru | Protected |
| | `PUT` | `/api/members/:id` | Memperbarui data anggota | Protected |
| | `DELETE` | `/api/members/:id` | Menghapus data anggota | Protected |
| **Loans** | `GET` | `/api/loans` | Mengambil daftar transaksi | Protected |
| | `POST` | `/api/loans` | Membuat transaksi peminjaman | Protected |
| | `PUT` | `/api/loans/:id/return`| Memproses pengembalian buku | Protected |
