/*
#
# 2. c. server.js : sebagai berkas entri untuk apliasi
#
*/

const express = require('express');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const port = 3000;

app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('UNSIA Digital Library API is Running!');
});

app.use('/api/books', bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 