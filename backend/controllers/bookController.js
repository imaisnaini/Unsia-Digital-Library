const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Protected
exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) { next(error); }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Protected
exports.createBook = async (req, res, next) => {
  try {
    const { title, author, isbn, category, stock } = req.body;

    if (!title || !author || !isbn || !category || stock === undefined) {
      return res.status(400).json({ success: false, message: 'Mohon lengkapi seluruh field data buku' });
    }

    const bookExists = await Book.findOne({ isbn });
    if (bookExists) {
      return res.status(400).json({ success: false, message: 'Buku dengan ISBN tersebut sudah ada' });
    }

    const book = await Book.create({
      title, author, isbn, category, stock, available: stock
    });

    res.status(201).json({ success: true, data: book });
  } catch (error) { next(error); }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Protected
exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!book) {
      return res.status(404).json({ success: false, message: 'Buku tidak ditemukan' });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) { next(error); }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Protected
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Buku tidak ditemukan' });
    }

    res.status(200).json({ success: true, message: 'Buku berhasil dihapus' });
  } catch (error) { next(error); }
};