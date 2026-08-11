# 📚 UNSIA Digital Library (Fullstack MERN Application)

## 📖 Deskripsi Proyek

**UNSIA Digital Library** adalah aplikasi sistem informasi perpustakaan digital berbasis **MERN Stack** (MongoDB, Express.js, React.js, Node.js). 

Aplikasi ini dirancang untuk memfasilitasi pengelolaan koleksi buku, data anggota/member, serta pencatatan transaksi peminjaman dan pengembalian buku secara terintegrasi dengan visualisasi statistik *real-time*.

---

# 👨‍🎓 Identitas Mahasiswa

| Keterangan     | Detail                               |
| -------------- | ------------------------------------ |
| Nama           | Fatimah Isnaini Shabrina             |
| NIM            | 250401020073                         |
| Program Studi  | Informatika PJJ S1                   |
| Kelas          | IF401                                |
| Mata Kuliah    | Pemrograman Web 2                    |
| Dosen Pengampu | Ratih Titi Komala Sari, ST, MM, MMSI |
| Semester       | Genap 2025/2026                      |
| Universitas    | Universitas Siber Asia (UNSIA)       |

---

## 💻 Tech Stack

### **Backend**
* **Node.js** & **Express.js** — RESTful API Framework
* **MongoDB** & **Mongoose** — NoSQL Database & ODM
* **JSON Web Token (JWT)** & **Bcrypt.js** — Autentikasi & Enkripsi Password
* **Cors** & **Dotenv** — Middleware Keamanan & Environment Configurations

### **Frontend**
* **React.js (Vite)** — Single Page Application Framework
* **React Router DOM v6** — Routing & Navigation Management
* **Axios** — HTTP Client untuk Integrasi API
* **Chart.js** & **React-Chartjs-2** — Visualisasi Data Statistik
* **CSS Modules / Inline Styling** — Responsive & Modern UI (Dark Theme)

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
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🚀 Fitur Utama

1. **Autentikasi & Keamanan Pengguna:**
   * Registrasi dan Login akun petugas/admin.
   * Enkripsi kata sandi menggunakan `bcryptjs`.
   * Akses terproteksi menggunakan JSON Web Token (JWT).
2. **Dashboard Interactive:**
   * Ringkasan statistik (Total Buku, Total Member, Sedang Dipinjam, dan Dikembalikan).
   * Visualisasi Distribusi Buku per Kategori (Doughnut Chart).
   * Visualisasi Statistik Peminjaman Aktif vs Selesai (Bar Chart).
3. **Manajemen Koleksi Buku (CRUD):**
   * Tambah, lihat, sunting, dan hapus data buku.
   * Pengelolaan stok buku secara otomatis saat dipinjam/dikembalikan.
4. **Manajemen Anggota / Member (CRUD):**
   * Pengelolaan profil dan data keanggotaan perpustakaan.
5. **Sistem Peminjaman & Pengembalian:**
   * Pencatatan transaksi peminjaman buku baru.
   * Fitur pengembalian otomatis yang menyesuaikan status transaksi dan pembaruan stok buku.
6. **Error Handling & Routing Layout:**
   * Penanganan halaman 404 Not Found kustom (`NotFound.jsx`).
   * Arsitektur `MainLayout` terpisah untuk halaman publik dan halaman terproteksi.

---

## 🛠️ Instalasi dan Menjalankan Project

### 1. Clone Repository
```bash
git clone [https://github.com/imaisnaini/Unsia-Digital-Library.git](https://github.com/imaisnaini/Unsia-Digital-Library.git)
cd Unsia-Digital-Library
```

---

### 2. Setup Backend

1. Masuk ke folder backend:
   ```bash
   cd backend
   ```
2. Install dependency:
   ```bash
   npm install
   ```
3. Buat file `.env` berdasarkan salinan `.env.example`:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/unsia_library
   JWT_SECRET=rahasia_jwt_unsia
   ```
4. Jalankan server backend:
   ```bash
   npm run dev
   ```
   *(Server backend akan berjalan di: `http://localhost:5000`)*

---

### 3. Setup Frontend

1. Buka terminal baru dan masuk ke folder frontend:
   ```bash
   cd frontend
   ```
2. Install dependency:
   ```bash
   npm install
   ```
3. Jalankan aplikasi frontend:
   ```bash
   npm run dev
   ```
   *(Aplikasi frontend akan berjalan di: `http://localhost:5173`)*

---

## 📡 REST API Endpoints Overview

| Modul | Method | Endpoint | Deskripsi | Akses |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Mendaftar akun baru | Publik |
| | `POST` | `/api/auth/login` | Login & mendapatkan Token | Publik |
| **Dashboard**| `GET` | `/api/dashboard/summary` | Mengambil data statistik & chart | Protected |
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
