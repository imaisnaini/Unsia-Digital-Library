const Book = require('../models/Book');
const Member = require('../models/Member');
const Loan = require('../models/Loan');

// @desc    Get dashboard summary & chart data
// @route   GET /api/dashboard/summary
// @access  Protected
exports.getSummary = async (req, res, next) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalMembers = await Member.countDocuments();
    const totalLoans = await Loan.countDocuments();
    const activeLoans = await Loan.countDocuments({ status: 'borrowed' });

    // Data agregasi grafik: Jumlah buku per kategori
    const categoryStats = await Book.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      summary: {
        totalBooks,
        totalMembers,
        totalLoans,
        activeLoans
      },
      categoryStats
    });
  } catch (error) { next(error); }
};