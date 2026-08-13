# 📚 UNSIA Digital Library

Aplikasi Sistem Informasi Perpustakaan Digital berbasis **MERN Stack** (MongoDB, Express.js, React.js, Node.js) yang dikembangkan untuk mengelola data buku, anggota/member, serta transaksi peminjaman buku secara terintegrasi.

---

## 🛠️ Tech Stack

### **Backend**
* **Node.js** & **Express.js** — Framework RESTful API
* **MongoDB** & **Mongoose** — Database NoSQL & Document Object Mapper
* **JSON Web Token (JWT)** & **Bcrypt.js** — Autentikasi & Keamanan Passwords

### **Frontend**
* **React.js (Vite)** — Library UI SPA
* **React Router DOM v6** — Navigasi & Client-side Routing
* **Axios** — HTTP Client untuk integrasi API
* **Chart.js / React-Chartjs-2** — Visualisasi Data Statistik Dashboard

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
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
🚀 Fitur Utama
Autentikasi & Otorisasi:

Login & Register Pengguna/Petugas dengan JWT Token.

Protected Routes untuk mengamankan akses halaman utama.

Dashboard Interactive:

Ringkasan Total Buku, Total Member, Peminjaman Aktif, dan Selesai.

Chart Distribusi Koleksi Buku per Kategori (Doughnut Chart).

Chart Transaksi Peminjaman (Bar Chart).

Manajemen Buku (CRUD):

Tambah, lihat, ubah, dan hapus data buku beserta manajemen stok.

Manajemen Member (CRUD):

Pengelolaan data anggota perpustakaan.

Sistem Peminjaman & Pengembalian:

Catat peminjaman buku baru.

Fitur pengembalian otomatis yang mengupdate status & menyesuaikan stok buku secara real-time.

💻 Cara Menjalankan Project
1. Backend Setup
Bash
cd backend
npm install
Buat file .env berdasarkan .env.example:

Code snippet
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/unsia_library
JWT_SECRET=rahasianegara
Jalankan server:

Bash
npm run dev
# atau
node server.js
2. Frontend Setup
Bash
cd frontend
npm install
npm run dev
Aplikasi frontend akan berjalan di http://localhost:5173.

berdasarkan soal, kita belum memiliki 404 not found page

Halaman 404 Not Found sangat penting untuk menangani URL acak atau tidak valid yang diakses oleh pengguna.

Berikut adalah langkah-langkah pembuatan dan integrasinya ke dalam struktur project kamu:

1. Buat Komponen Halaman 404 (frontend/src/pages/NotFound.jsx)
Buat file baru di frontend/src/pages/NotFound.jsx dengan gaya tampilan tema gelap (Navy Dark Theme) yang konsisten dengan aplikasi:

JavaScript
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.title}>Halaman Tidak Ditemukan</h2>
      <p style={styles.description}>
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <Link to="/dashboard" style={styles.button}>
        Kembali ke Dashboard
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    color: '#e6f1ff',
    textAlign: 'center',
    padding: '20px',
  },
  errorCode: {
    fontSize: '8rem',
    fontWeight: 'bold',
    color: '#64ffda',
    margin: 0,
    lineHeight: 1,
  },
  title: {
    fontSize: '2rem',
    margin: '20px 0 10px',
  },
  description: {
    color: '#8892b0',
    marginBottom: '30px',
    fontSize: '1.1rem',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#64ffda',
    border: '1px solid #64ffda',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  },
};

export default NotFound;
2. Daftarkan Route Catch-All * di frontend/src/App.jsx
Buka file App.jsx dan tambahkan route dengan path * di bagian paling bawah daftar <Routes>. Path wildcard * ini akan menangkap semua URL yang tidak cocok dengan route yang sudah terdefinisi.

JavaScript
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Member from './pages/Members';
import Loans from './pages/Loans';
import NotFound from './pages/NotFound'; // 1. Import Halaman NotFound
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0a192f' }}>
          <Routes>
            {/* Halaman Publik */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Halaman Terproteksi */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Books />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/members"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Member />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/loans"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Loans />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* 🟢 2. Catch-All Route untuk Halaman 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
3. (Opsional) Penanganan 404 pada Backend Node.js (backend/server.js)
Untuk memastikan API backend juga menangani request endpoint yang tidak terdaftar dengan status code 404, tambahkan middleware 404 handler di server.js sebelum middleware error handler utama:

JavaScript
// Letakkan di server.js setelah semua definisi app.use('/api/...', routes)

// 404 API Fallback Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint API tidak ditemukan'
  });
});
📌 Update To-Do List & README
To-Do List Update:

[x] Membuat komponen NotFound.jsx dan mendaftarkan route wildcard * di App.jsx.

[ ] Testing akses URL sembarang (misal: localhost:5173/halaman-ngasal) untuk memastikan 404 muncul.

File Tree Update:
Tambahkan NotFound.jsx ke dalam daftar pages/ di file README.md:

Plaintext
├── pages/
│   ├── Books.jsx
│   ├── Dashboard.jsx
│   ├── Loans.jsx
│   ├── Login.jsx
│   ├── Members.jsx
│   ├── NotFound.jsx
│   └── Register.jsx
cara mengecek data di mongodb cloud?

Untuk mengecek data di MongoDB Cloud (MongoDB Atlas), ada 2 cara paling praktis dan umum yang bisa kamu gunakan:

Cara 1: Langsung melalui Web Dashboard MongoDB Atlas (Tanpa Install App)
Ini adalah cara tercepat tanpa perlu menginstal aplikasi tambahan.

Buka situs MongoDB Atlas dan Log In ke akun kamu.

Di halaman Database Deployments, cari klaster (Cluster) kamu (misalnya Cluster0).

Klik tombol Browse Collections.

Di panel sebelah kiri, kamu akan melihat daftar Database dan Collections (seperti books, members, loans, users).

Klik nama collection yang ingin kamu lihat, data dalam bentuk dokumen BSON/JSON akan langsung tampil di layar.

Kamu bisa menggunakan bar pencarian (FILTER) untuk mencari data tertentu, contoh:

{ "status": "borrowed" }

Cara 2: Menggunakan Software MongoDB Compass (Rekomendasi untuk Developer)
MongoDB Compass adalah aplikasi GUI resmi dari MongoDB yang lebih nyaman digunakan saat coding.

Download & Install MongoDB Compass dari situs resmi MongoDB.

Buka dashboard MongoDB Atlas di browser, lalu klik tombol Connect pada cluster kamu.

Pilih opsi Compass -> I have MongoDB Compass installed.

Salin string koneksi (Connection String) yang diberikan, contohnya:

Plaintext
mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/
Buka aplikasi MongoDB Compass di komputer kamu.

Paste Connection String tadi ke kolom URL, lalu isi <username> dan <password> sesuai akun database kamu.

Klik Connect, lalu kamu bisa menjelajahi, mengedit, atau menghapus data secara visual.

💡 Tips Cepat
Jika kamu ingin mengecek langsung saat testing aplikasi React/Node.js, Cara 1 (Browse Collections via Web) adalah yang paling simpel karena kamu tidak perlu memasang software baru.

Apakah string koneksi MongoDB Atlas di file .env kamu sudah terhubung dengan benar?

# 📚 UNSIA Digital Library RESTful API



## 📖 Deskripsi Proyek



**UNSIA Digital Library** adalah proyek Ujian Tengah Semester (UTS) untuk mata kuliah **Pemrograman Web 2** yang bertujuan membangun RESTful API menggunakan **Node.js** dan **Express.js**.



API ini digunakan untuk mengelola data buku pada sistem perpustakaan digital dengan menerapkan konsep:



* RESTful API

* Routing

* Controller

* JSON Response

* Error Handling

* Arsitektur MVC (Model-View-Controller)



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



# 🚀 Instalasi dan Menjalankan Project



## 1. Clone Repository



```bash

git clone <repository-url>

```



## 2. Masuk ke Folder Project



```bash

cd unsia-digital-library

```



## 3. Install Dependency



```bash

npm install

```



## 4. Jalankan Aplikasi



Development Mode:



```bash

npm run dev

```



Production Mode:



```bash

npm start

```



Server akan berjalan pada:



```text

http://localhost:3000

```



---



# 📡 REST API Endpoint



## 1. Menampilkan Seluruh Buku



### Request



```http

GET /api/books

```



### Response



```json

{

  "message": "Berhasil mengambil data buku",

  "data": []

}

```



---



## 2. Menambahkan Buku Baru



### Request



```http

POST /api/books

```



### Body



```json

{

  "title": "Express.js untuk Pemula",

  "author": "Fatimah",

  "year": 2026

}

```



### Response



```json

{

  "message": "Buku berhasil ditambahkan",

  "data": {

    "id": 1,

    "title": "Express.js untuk Pemula",

    "author": "Fatimah",

    "year": 2026

  }

}

```



---



## 3. Memperbarui Data Buku



### Request



```http

PUT /api/books/:id

```



### Body



```json

{

  "title": "Belajar Express.js",

  "author": "Fatimah",

  "year": 2026

}

```



### Response



```json

{

  "message": "Buku berhasil diperbarui"

}

```



---



## 4. Menghapus Data Buku



### Request



```http

DELETE /api/books/:id

```



### Response



```json

{

  "message": "Buku berhasil dihapus"

}

```



---

ini adalah file readme yg sekarang, mari kita update berdasarkan project terbaru

Berikut adalah versi pembaruan lengkap untuk file README.md. File ini telah disesuaikan dari versi UTS (Backend Express standar) menjadi aplikasi Fullstack MERN (MongoDB, Express, React, Node.js) lengkap dengan sistem autentikasi JWT, dashboard analitik, dan manajemen transaksi peminjaman.

Markdown
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
* **Cors** & **Dotenv** — Middleware Keamanan & Lingkungan Lingkungan (Environment)

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
🚀 Fitur Utama
Autentikasi & Keamanan Pengguna:

Registrasi dan Login akun petugas/admin.

Enkripsi kata sandi menggunakan bcryptjs.

Akses terproteksi menggunakan JSON Web Token (JWT).

Dashboard Interactive:

Ringkasan statistik (Total Buku, Total Member, Sedang Dipinjam, dan Dikembalikan).

Visualisasi Distribusi Buku per Kategori (Doughnut Chart).

Visualisasi Statistik Peminjaman Aktif vs Selesai (Bar Chart).

Manajemen Koleksi Buku (CRUD):

Tambah, lihat, sunting, dan hapus data buku.

Pengelolaan stok buku secara otomatis saat dipinjam/dikembalikan.

Manajemen Anggota / Member (CRUD):

Pengelolaan profil dan data keanggotaan perpustakaan.

Sistem Peminjaman & Pengembalian:

Pencatatan transaksi peminjaman buku baru.

Fitur pengembalian otomatis yang menyesuaikan status transaksi dan pembaruan stok buku.

Error Handling & Routing Layout:

Penanganan halaman 404 Not Found kustom.

Arsitektur MainLayout terpisah untuk halaman publik dan halaman terproteksi.

🛠️ Instalasi dan Menjalankan Project
1. Clone Repository
Bash
git clone [https://github.com/imaisnaini/Unsia-Digital-Library.git](https://github.com/imaisnaini/Unsia-Digital-Library.git)
cd Unsia-Digital-Library
2. Setup Backend
Masuk ke folder backend:

Bash
cd backend
Install dependency:

Bash
npm install
Buat file .env berdasarkan salinan .env.example:

Code snippet
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/unsia_library
JWT_SECRET=rahasia_jwt_unsia
Jalankan server backend:

Bash
npm run dev
Server backend akan berjalan di: http://localhost:5000

3. Setup Frontend
Buka terminal baru dan masuk ke folder frontend:

Bash
cd frontend
Install dependency:

Bash
npm install
Jalankan aplikasi frontend:

Bash
npm run dev
Aplikasi frontend akan berjalan di: http://localhost:5173

📡 REST API Endpoints Overview
Modul	Method	Endpoint	Deskripsi	Akses
Auth	POST	/api/auth/register	Mendaftar akun baru	Publik
POST	/api/auth/login	Login & mendapatkan Token	Publik
Dashboard	GET	/api/dashboard/summary	Mengambil data statistik & chart	Protected
Books	GET	/api/books	Mengambil daftar semua buku	Protected
POST	/api/books	Menambahkan buku baru	Protected
PUT	/api/books/:id	Memperbarui data buku	Protected
DELETE	/api/books/:id	Menghapus data buku	Protected
Members	GET	/api/members	Mengambil daftar anggota	Protected
POST	/api/members	Menambahkan anggota baru	Protected
PUT	/api/members/:id	Memperbarui data anggota	Protected
DELETE	/api/members/:id	Menghapus data anggota	Protected
Loans	GET	/api/loans	Mengambil daftar transaksi	Protected
POST	/api/loans	Membuat transaksi peminjaman	Protected
PUT	/api/loans/:id/return	Memproses pengembalian buku	Protected
buatkan file .md nya

Berikut adalah isi lengkap untuk file README.md. Kamu bisa menyalin seluruh blok teks di bawah ini dan langsung menimpanya (overwrite) ke file README.md di proyek kamu.

Markdown
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
🚀 Fitur Utama
Autentikasi & Keamanan Pengguna:

Registrasi dan Login akun petugas/admin.

Enkripsi kata sandi menggunakan bcryptjs.

Akses terproteksi menggunakan JSON Web Token (JWT).

Dashboard Interactive:

Ringkasan statistik (Total Buku, Total Member, Sedang Dipinjam, dan Dikembalikan).

Visualisasi Distribusi Buku per Kategori (Doughnut Chart).

Visualisasi Statistik Peminjaman Aktif vs Selesai (Bar Chart).

Manajemen Koleksi Buku (CRUD):

Tambah, lihat, sunting, dan hapus data buku.

Pengelolaan stok buku secara otomatis saat dipinjam/dikembalikan.

Manajemen Anggota / Member (CRUD):

Pengelolaan profil dan data keanggotaan perpustakaan.

Sistem Peminjaman & Pengembalian:

Pencatatan transaksi peminjaman buku baru.

Fitur pengembalian otomatis yang menyesuaikan status transaksi dan pembaruan stok buku.

Error Handling & Routing Layout:

Penanganan halaman 404 Not Found kustom (NotFound.jsx).

Arsitektur MainLayout terpisah untuk halaman publik dan halaman terproteksi.

🛠️ Instalasi dan Menjalankan Project
1. Clone Repository
Bash
git clone [https://github.com/imaisnaini/Unsia-Digital-Library.git](https://github.com/imaisnaini/Unsia-Digital-Library.git)
cd Unsia-Digital-Library
2. Setup Backend
Masuk ke folder backend:

Bash
cd backend
Install dependency:

Bash
npm install
Buat file .env berdasarkan salinan .env.example:

Code snippet
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/unsia_library
JWT_SECRET=rahasia_jwt_unsia
Jalankan server backend:

Bash
npm run dev
Server backend akan berjalan di: http://localhost:5000

3. Setup Frontend
Buka terminal baru dan masuk ke folder frontend:

Bash
cd frontend
Install dependency:

Bash
npm install
Jalankan aplikasi frontend:

Bash
npm run dev
Aplikasi frontend akan berjalan di: http://localhost:5173

📡 REST API Endpoints Overview
Modul	Method	Endpoint	Deskripsi	Akses
Auth	POST	/api/auth/register	Mendaftar akun baru	Publik
POST	/api/auth/login	Login & mendapatkan Token	Publik
Dashboard	GET	/api/dashboard/summary	Mengambil data statistik & chart	Protected
Books	GET	/api/books	Mengambil daftar semua buku	Protected
POST	/api/books	Menambahkan buku baru	Protected
PUT	/api/books/:id	Memperbarui data buku	Protected
DELETE	/api/books/:id	Menghapus data buku	Protected
Members	GET	/api/members	Mengambil daftar anggota	Protected
POST	/api/members	Menambahkan anggota baru	Protected
PUT	/api/members/:id	Memperbarui data anggota	Protected
DELETE	/api/members/:id	Menghapus data anggota	Protected
Loans	GET	/api/loans	Mengambil daftar transaksi	Protected
POST	/api/loans	Membuat transaksi peminjaman	Protected
PUT	/api/loans/:id/return	Memproses pengembalian buku	Protected
jawaban yg kamu berikan masih terbatas, file md hanya sampai pada project structure, bagian seperti fitur utama, instalasi hingga tabel rest api tidak tercantum di .md, akan menyulitkan dan memungkinkan format berubat jika aku copy paste terpisah

Berikut adalah seluruh isi file README.md secara utuh dari judul hingga tabel REST API dalam satu blok kode. Kamu bisa langsung mengklik tombol Copy di pojok kanan atas kode di bawah ini lalu menimpanya (overwrite) ke file README.md lokal kamu:

Markdown
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

---

## 🚀 Fitur Utama

1. **Autentikasi & Keamanan Pengguna:**
   * Registrasi dan Login akun petugas/admin.
   * Enkripsi kata sandi menggunakan bcryptjs.
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
git clone https://github.com/imaisnaini/Unsia-Digital-Library.git
cd Unsia-Digital-Library

---

### 2. Setup Backend

1. Masuk ke folder backend:
   cd backend
2. Install dependency:
   npm install
3. Buat file .env berdasarkan salinan .env.example:
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/unsia_library
   JWT_SECRET=rahasia_jwt_unsia
4. Jalankan server backend:
   npm run dev
   (Server backend akan berjalan di: http://localhost:5000)

---

### 3. Setup Frontend

1. Buka terminal baru dan masuk ke folder frontend:
   cd frontend
2. Install dependency:
   npm install
3. Jalankan aplikasi frontend:
   npm run dev
   (Aplikasi frontend akan berjalan di: http://localhost:5173)

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
struktur foldernya rusak

Penyebab struktur folder berantakan/menjadi satu baris panjang adalah karena teks pohon struktur tidak dibungkus dengan code block (tanda tiga backtick text ... ). Tanpa pembungkus code block, renderer Markdown menganggap baris-baris tersebut sebagai teks paragraf biasa.

Berikut adalah seluruh isi file README.md secara lengkap dan utuh. Struktur folder dan seluruh perintah terminal kini sudah dibungkus code block dengan benar sehingga tampilan di GitHub akan rapi secara presisi.

Markdown
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