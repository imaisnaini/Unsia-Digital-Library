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

