const Member = require('../models/Member');

// @desc    Get all members
// @route   GET /api/members
exports.getMembers = async (req, res, next) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: members.length, data: members });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new member
// @route   POST /api/members
exports.createMember = async (req, res, next) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

// @desc    Update member
// @route   PUT /api/members/:id
exports.updateMember = async (req, res, next) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!member) return res.status(404).json({ success: false, message: 'Member tidak ditemukan' });
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete member
// @route   DELETE /api/members/:id
exports.deleteMember = async (req, res, next) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Member tidak ditemukan' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};