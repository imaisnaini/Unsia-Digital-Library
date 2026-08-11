const Loan = require('../models/Loan');
const Book = require('../models/Book');
const Member = require('../models/Member');

// @desc    Get all loans
// @route   GET /api/loans
// @access  Protected
exports.getLoans = async (req, res, next) => {
  try {
    const loans = await Loan.find()
      .populate('book', 'title isbn author')
      .populate('member', 'name memberCode email')
      .populate('user', 'name email') // Petugas
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: loans.length, data: loans });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new loan (Pinjam Buku untuk Member)
// @route   POST /api/loans
// @access  Protected
exports.createLoan = async (req, res, next) => {
  try {
    const { bookId, memberId } = req.body;

    if (!bookId || !memberId) {
      return res.status(400).json({ success: false, message: 'Buku dan Member wajib diisi' });
    }

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ success: false, message: 'Buku tidak ditemukan' });

    const member = await Member.findById(memberId);
    if (!member) return res.status(404).json({ success: false, message: 'Member tidak ditemukan' });

    // Cek stok buku (sesuaikan nama field dengan schema Book kamu: stock / available)
    const currentStock = book.stock !== undefined ? book.stock : book.available;
    if (currentStock <= 0) {
      return res.status(400).json({ success: false, message: 'Stok buku sedang kosong' });
    }

    const loan = await Loan.create({
      book: bookId,
      member: memberId,
      user: req.user.id // Petugas yang melayani
    });

    // Kurangi stok buku
    if (book.stock !== undefined) book.stock -= 1;
    if (book.available !== undefined) book.available -= 1;
    await book.save();

    res.status(201).json({ success: true, data: loan });
  } catch (error) {
    next(error);
  }
};

// @desc    Return book (Pengembalian Buku)
// @route   PUT /api/loans/:id/return
// @access  Protected
exports.returnLoan = async (req, res, next) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) return res.status(404).json({ success: false, message: 'Peminjaman tidak ditemukan' });
    if (loan.status === 'DIKEMBALIKAN' || loan.status === 'returned') {
      return res.status(400).json({ success: false, message: 'Buku sudah dikembalikan' });
    }

    loan.status = 'DIKEMBALIKAN';
    loan.returnDate = Date.now();
    await loan.save();

    // Tambah kembali stok buku
    const book = await Book.findById(loan.book);
    if (book) {
      if (book.stock !== undefined) book.stock += 1;
      if (book.available !== undefined) book.available += 1;
      await book.save();
    }

    res.status(200).json({ success: true, message: 'Buku berhasil dikembalikan', data: loan });
  } catch (error) {
    next(error);
  }
};