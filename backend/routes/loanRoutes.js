const express = require('express');
const router = express.Router();
const { getLoans, createLoan, returnLoan } = require('../controllers/loanController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
    .get(getLoans)
    .post(createLoan);

router.put('/:id/return', returnLoan);

module.exports = router;