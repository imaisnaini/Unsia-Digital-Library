const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  memberCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);