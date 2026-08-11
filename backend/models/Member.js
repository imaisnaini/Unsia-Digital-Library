const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    memberCode: {
      type: String,
      required: [true, 'Kode anggota wajib diisi'],
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, 'Nama anggota wajib diisi'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email anggota wajib diisi'],
      unique: true,
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Nomor HP wajib diisi']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);