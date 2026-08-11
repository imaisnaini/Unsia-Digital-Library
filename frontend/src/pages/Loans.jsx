import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [loanRes, bookRes, memberRes] = await Promise.all([
        API.get('/loans'),
        API.get('/books'),
        API.get('/members'),
      ]);
      setLoans(loanRes.data.data || []);
      setBooks(bookRes.data.data || []);
      setMembers(memberRes.data.data || []);
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBorrow = async (e) => {
    e.preventDefault();
    if (!selectedBook || !selectedMember) {
      return alert('Silakan pilih Member dan Buku terlebih dahulu');
    }

    try {
      await API.post('/loans', {
        bookId: selectedBook,
        memberId: selectedMember,
      });
      setSelectedBook('');
      setSelectedMember('');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal meminjam buku');
    }
  };

  const handleReturn = async (id) => {
    try {
      await API.put(`/loans/${id}/return`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengembalikan buku');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={{ color: '#e6f1ff', marginBottom: '20px' }}>Transaksi Peminjaman</h1>

        {/* Card Form Transaksi Pinjam */}
        <div style={styles.card}>
          <h3 style={{ color: '#64ffda', marginTop: 0 }}>Catat Peminjaman Baru</h3>
          <form onSubmit={handleBorrow} style={styles.form}>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              style={styles.select}
              required
            >
              <option value="">-- Pilih Member --</option>
              {members.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.memberCode} - {m.name}
                </option>
              ))}
            </select>

            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              style={styles.select}
              required
            >
              <option value="">-- Pilih Buku Tersedia --</option>
              {books
                .filter((b) => (b.stock !== undefined ? b.stock > 0 : b.available > 0))
                .map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.title} (Stok: {b.stock !== undefined ? b.stock : b.available})
                  </option>
                ))}
            </select>

            <button type="submit" style={styles.borrowBtn}>
              Proses Pinjam
            </button>
          </form>
        </div>

        {/* Tabel Riwayat Transaksi */}
        {loading ? (
          <p style={{ color: '#8892b0' }}>Memuat data transaksi...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.trHeader}>
                <th style={styles.th}>Member</th>
                <th style={styles.th}>Buku</th>
                <th style={styles.th}>Petugas (User)</th>
                <th style={styles.th}>Tgl Pinjam</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loans.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ ...styles.td, textAlign: 'center' }}>
                    Belum ada transaksi peminjaman.
                  </td>
                </tr>
              ) : (
                loans.map((loan) => (
                  <tr key={loan._id} style={styles.trBody}>
                    <td style={styles.td}>
                      {loan.member?.name ? `${loan.member.name} (${loan.member.memberCode})` : 'Member Dihapus'}
                    </td>
                    <td style={styles.td}>{loan.book?.title || 'Buku Dihapus'}</td>
                    <td style={styles.td}>{loan.user?.name || loan.user?.email || '-'}</td>
                    <td style={styles.td}>{new Date(loan.createdAt).toLocaleDateString('id-ID')}</td>
                    <td style={styles.td}>
                      <span
                        style={
                          loan.status === 'DIKEMBALIKAN' || loan.status === 'returned'
                            ? styles.statusBadgeDone
                            : styles.statusBadgeActive
                        }
                      >
                        {loan.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {loan.status !== 'DIKEMBALIKAN' && loan.status !== 'returned' && (
                        <button style={styles.returnBtn} onClick={() => handleReturn(loan._id)}>
                          Kembalikan
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#0a192f', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" },
  content: { padding: '30px', maxWidth: '1100px', margin: '0 auto' },
  card: { backgroundColor: '#112240', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #233554' },
  form: { display: 'flex', gap: '15px' },
  select: { flex: 1, padding: '10px', backgroundColor: '#0a192f', border: '1px solid #233554', color: '#fff', borderRadius: '6px' },
  borrowBtn: { backgroundColor: '#64ffda', color: '#0a192f', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#112240', borderRadius: '8px', overflow: 'hidden' },
  trHeader: { backgroundColor: '#233554', color: '#64ffda', textAlign: 'left' },
  th: { padding: '12px 16px', fontSize: '14px' },
  trBody: { borderBottom: '1px solid #233554', color: '#e6f1ff' },
  td: { padding: '12px 16px', fontSize: '14px' },
  statusBadgeActive: { backgroundColor: '#ffc107', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
  statusBadgeDone: { backgroundColor: '#28a745', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
  returnBtn: { backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
};

export default Loans;