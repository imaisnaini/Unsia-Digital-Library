const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next) {
    const authorization = req.headers.authorization || '';
    if (!authorization.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Akses ditolak. Sertakan Bearer token yang valid.'
        });
    }

    const token = authorization.substring(7).trim();

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token tidak ditemukan.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256'],
        });

        // Mendukung decoded.id ATAU decoded.sub agar kompatibel
        const userId = decoded.user?.id || decoded.id || decoded.sub;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Pengguna untuk token ini tidak ditemukan.'
            });
        }

        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        return next();
    } catch (error) {
        // Perbaikan typo TokenExpiredError
        const message = 
            error.name === 'TokenExpiredError'
                ? 'Token sudah kadaluwarsa. Silahkan login kembali.'
                : 'Token tidak valid atau sudah dimodifikasi.';
            
        return res.status(401).json({ success: false, message });
    }
}

module.exports = { protect };