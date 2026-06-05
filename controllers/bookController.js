/*
    3. Implementasi Routing dan RESTful API
*/

let books = [
    {
        id: 1,
        title: "Belajar Node.js",
        author: "Fatimah",
        year: 2023
    },
    {
        id: 2,
        title: "Pemrograman Web dengan Express",
        author: "Isnaini",
        year: 2024
    },
    {
        id: 3,
        title: "Pengantar Data Science",
        author: "Shabrina",
        year: 2023
    }
];

// 3. a. GET /api/books : untuk menampilkan seluruh daftar buku dalam format array JSON
const getAllBooks = (req, res) => {
    try {
        // 4. b. Success response
        res.status(200).json({
            success: true,
            data: books,
            message: "Daftar buku berhasil diambil"
        });
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

// 3. b. POST /api/books : untuk menambahkan data buku baru (input melalui req.body)
const addNewBook = (req, res) => {
    const { title, author, year } = req.body;

    // 4. b. Error handling - Bad Request
    if (!title || !author || !year) {
        return res.status(40).json({
            success: false,
            message: "Data buku tidak lengkap. Pastikan title, author, dan year diisi."
        });
    }

    // Menambahkan buku baru ke dalam array
    const newBook = {
        id: books.length + 1,
        title,
        author,
        year
    };
    books.push(newBook);
    try {
        res.status(201).json({
            success: true,
            data: newBook,
            message: "Buku berhasil ditambahkan"
        });
    } catch (error) {
        next(error); // Pass error to global error handler  
    }
};

// 3. c. PUT /api/books/:id : untuk memperbarui informasi buku berdasarkan ID tertentu
const updateBook = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author, year } = req.body;

    // 4. b. Error handling - Not Found
    const book = books.find(b => b.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Buku tidak ditemukan"
        });
    }

    // Perbarui informasi buku
    book.title = title || book.title;
    book.author = author || book.author;
    book.year = year || book.year;
    try {
        res.status(200).json({
            success: true,
            data: book,
            message: "Buku berhasil diperbarui"
        });
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

// 3. d. DELETE /api/books/:id : untuk menghapus data buku dari sistem
const deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    
    // 4. b. Error handling
    const index = books.findIndex(b => b.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Buku tidak ditemukan"
        });
    }

    // Hapus buku dari array
    const deletedBook = books.splice(index, 1);
    try {
        res.status(200).json({
            success: true,
            data: deletedBook[0],
            message: "Buku berhasil dihapus"
        });
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

module.exports = {
    getAllBooks,
    addNewBook,
    updateBook,
    deleteBook
};