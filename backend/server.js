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

// Register API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/loans', require('./routes/loanRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

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