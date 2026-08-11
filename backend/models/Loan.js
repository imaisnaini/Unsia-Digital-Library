const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // user / petugas pencatat
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true}, // user peminjam
  borrowDate: { type: Date, default: Date.now },
  dueDate: { type: Date, default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000)},
  returnDate: { type: Date },
  status: { type: String, enum: ['borrowed', 'returned'], default: 'borrowed' }
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);