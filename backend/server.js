/*
#
# 2. c. server.js : sebagai berkas entri untuk apliasi
#
*/

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('UNSIA Digital Library API is Running!');
});

app.use('/api/auth', authRoutes);

app.use('/api/books', bookRoutes);

// Global error handling 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Terjadi kesalahan pada server. Silakan coba lagi nanti."
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 