const { body } = require('express-validator');

const registerValidator = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Nama wajib diisi.')
        .isLength({ min: 3, max: 50})
        .withMessage('Nama harus teridi dari 3-50 karakter.'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Format email tidak valid.')
        .normalizeEmail(),
    body('password')
        .isString()
        .withMessage('Password harus berupa teks.')
        .isLength({ min: 8 })
        .withMessage('Password minimal 8 karakter.')
        .matches(/[0-9]/)
        .withMessage('Password harus memiliki angka.')
];

const loginValidator = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Format email tidak valid.')
        .normalizeEmail(),
    body('password')
        .isString()
        .notEmpty()
        .withMessage('Password wajib diisi.')
];

module.exports = { registerValidator, loginValidator };