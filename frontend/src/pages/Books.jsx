import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State Modal & Form
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: 'Umum',
    stock: 1
  });

  const fetchBooks = async () => {
    try {
      const res = await API.get('/books');
      setBooks(res.data.data || []);
    } catch (err) {
      console.error('Gagal mengambil daftar buku:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleOpenModal = (book = null) => {
    if (book) {
      setEditId(book._id);
      setFormData({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        category: book.category,
        stock: book.stock
      });
    } else {
      setEditId(null);
      setFormData({ title: '', author: '', isbn: '', category: 'Umum', stock: 1 });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/books/${editId}`, formData);
      } else {
        await API.post('/books', formData);
      }
      setShowModal(false);
      fetchBooks();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan data buku');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah kamu yakin ingin menghapus buku ini?')) {
      try {
        await API.delete(`/books/${id}`);
        fetchBooks();
      } catch (err) {
        alert('Gagal menghapus buku');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={{ color: '#fff' }}>Manajemen Buku</h1>
          <button style={styles.addBtn} onClick={() => handleOpenModal()}>
            + Tambah Buku
          </button>
        </div>

        {loading ? (
          <p style={{ color: '#8892b0' }}>Memuat daftar buku...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.trHeader}>
                <th style={styles.th}>Judul</th>
                <th style={styles.th}>Penulis</th>
                <th style={styles.th}>ISBN</th>
                <th style={styles.th}>Kategori</th>
                <th style={styles.th}>Stok</th>
                <th style={styles.th}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ ...styles.td, textAlign: 'center' }}>
                    Belum ada data buku.
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book._id} style={styles.trBody}>
                    <td style={styles.td}>{book.title}</td>
                    <td style={styles.td}>{book.author}</td>
                    <td style={styles.td}>{book.isbn}</td>
                    <td style={styles.td}>{book.category}</td>
                    <td style={styles.td}>{book.stock}</td>
                    <td style={styles.td}>
                      <button style={styles.editBtn} onClick={() => handleOpenModal(book)}>Edit</button>
                      <button style={styles.deleteBtn} onClick={() => handleDelete(book._id)}>Hapus</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Grey Navy Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h2 style={{ color: '#64ffda', marginBottom: '20px' }}>
              {editId ? 'Edit Buku' : 'Tambah Buku Baru'}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Judul Buku"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Penulis"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="text"
                placeholder="ISBN"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Kategori"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Stok"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                min="0"
                required
                style={styles.input}
              />
              <div style={styles.modalActions}>
                <button type="button" onClick={() => setShowModal(false)} style={styles.cancelBtn}>
                  Batal
                </button>
                <button type="submit" style={styles.saveBtn}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
const styles = {
  container: { display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0a192f', fontFamily: "'Segoe UI', sans-serif" },
  content: { flex: 1, padding: '20px 30px', maxWidth: '1100px', margin: '0 auto', width: '100%', boxSizing: 'border-box' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  addBtn: { backgroundColor: '#64ffda', color: '#0a192f', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#112240', borderRadius: '8px', overflow: 'hidden' },
  trHeader: { backgroundColor: '#233554', color: '#64ffda', textAlign: 'left' },
  th: { padding: '12px 16px', fontSize: '14px' },
  trBody: { borderBottom: '1px solid #233554', color: '#e6f1ff' },
  td: { padding: '12px 16px', fontSize: '14px', textAlign: 'left' },
  editBtn: { backgroundColor: '#ffc107', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' },
  deleteBtn: { backgroundColor: '#ff4d4f', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  footer: { backgroundColor: '#060d1a', color: '#8892b0', textAlign: 'center', padding: '12px 20px', fontSize: '13px', borderTop: '1px solid #112240' },
  
  // Grey Navy Modal Style
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: '#172a45', padding: '30px', borderRadius: '10px', width: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
  input: { width: '100%', padding: '10px', marginBottom: '15px', backgroundColor: '#0a192f', border: '1px solid #233554', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' },
  cancelBtn: { backgroundColor: 'transparent', color: '#8892b0', border: '1px solid #8892b0', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
  saveBtn: { backgroundColor: '#64ffda', color: '#0a192f', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }
};

export default Books;