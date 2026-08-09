const Loan = require('../models/Loan');
const Book = require('../models/Book');
const Member = require('../models/Member');

// @desc    Get all loans
// @route   GET /api/loans
// @access  Protected
exports.getLoans = async (req, res, next) => {
    try {
        const loans = await Loan.find()
            .populate('book', 'title isbn')
            .populate('member', 'name memberCode')
            .sort({ createdAt: -1 });
        
        res.status(200).json({ success: true, count: loans.length, data: loans });
    } catch (error) { next(error); }
}

// @desc    Create new loan (Pinjam Buku)
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

        if (book.available <= 0) return res.status(400).json({ success: false, message: 'Stok buku sedang kosong' });

        const loan = await Loan.create({
            book: bookId,
            Member: memberId
        });

        // Kurangi stok buku
        book.available -= 1;
        await book.save();

        res.status(201).json({ success: true, data: loan });
    } catch (error) { next(error); }
}

// @desc    Return book (Pengembalian Buku)
// @route   PUT /api/loans/:id/return
// @access  Protected
exports.returnLoan = async (req, res, next) => {
    try {
        const loan = await Loan.findById(req.params.id);

        if (!loan) return res.status(404).json({ success: false, message: 'Peminjaman tidak ditemukan'});
        if (loan.status == 'returned') return res.status(400).json({ success: false, message: 'Buku sudah dikembalikan'});

        loan.status = 'returned';
        loan.returnDate = Date.now();
        await loan.save();

        // Kembalikan stok buku
        const book = await Book.findById(loan.book);
        if (book) {
            book.available += 1;
            await book.save();
        }

        res.status(200).json({ success: true, message: 'Buku berhasil dikembalikan'});
    } catch (error) { next(error); }
}