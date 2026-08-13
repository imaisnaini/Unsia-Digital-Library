import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({ memberCode: '', name: '', email: '', phone: '' });
  const [editId, setEditId] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await API.get('/members');
      setMembers(res.data.data || []);
    } catch (err) {
      console.error('Gagal mengambil data member:', err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/members/${editId}`, formData);
      } else {
        await API.post('/members', formData);
      }
      setFormData({ memberCode: '', name: '', email: '', phone: '' });
      setEditId(null);
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan data member');
    }
  };

  const handleEdit = (member) => {
    setEditId(member._id);
    setFormData({
      memberCode: member.memberCode,
      name: member.name,
      email: member.email,
      phone: member.phone,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus member ini?')) return;
    try {
      await API.delete(`/members/${id}`);
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus member');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Kelola Member Perpustakaan</h1>

        {/* Form Add/Edit Member */}
        <div style={styles.card}>
          <h3 style={{ color: '#64ffda', marginTop: 0 }}>
            {editId ? 'Edit Member' : 'Tambah Member Baru'}
          </h3>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Kode Member (cth: M-001)"
              value={formData.memberCode}
              onChange={(e) => setFormData({ ...formData, memberCode: e.target.value })}
              style={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={styles.input}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Nomor Telepon"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={styles.input}
              required
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={styles.btnPrimary}>
                {editId ? 'Update Member' : 'Tambah Member'}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setFormData({ memberCode: '', name: '', email: '', phone: '' });
                  }}
                  style={styles.btnCancel}
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabel Data Member */}
        <table style={styles.table}>
          <thead>
            <tr style={styles.trHeader}>
              <th style={styles.th}>Kode Member</th>
              <th style={styles.th}>Nama</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Telepon</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ ...styles.td, textAlign: 'center' }}>
                  Belum ada data member.
                </td>
              </tr>
            ) : (
              members.map((item) => (
                <tr key={item._id} style={styles.trBody}>
                  <td style={styles.td}>{item.memberCode}</td>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{item.email}</td>
                  <td style={styles.td}>{item.phone}</td>
                  <td style={styles.td}>
                    <button style={styles.btnEdit} onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                    <button style={styles.btnDelete} onClick={() => handleDelete(item._id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#0a192f', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" },
  content: { padding: '30px', maxWidth: '1100px', margin: '0 auto' },
  title: { color: '#e6f1ff', marginBottom: '20px' },
  card: { backgroundColor: '#112240', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #233554' },
  form: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  input: { padding: '10px', backgroundColor: '#0a192f', border: '1px solid #233554', color: '#fff', borderRadius: '6px' },
  btnPrimary: { backgroundColor: '#64ffda', color: '#0a192f', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  btnCancel: { backgroundColor: '#8892b0', color: '#0a192f', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#112240', borderRadius: '8px', overflow: 'hidden' },
  trHeader: { backgroundColor: '#233554', color: '#64ffda', textAlign: 'left' },
  th: { padding: '12px 16px', fontSize: '14px' },
  trBody: { borderBottom: '1px solid #233554', color: '#e6f1ff' },
  td: { padding: '12px 16px', fontSize: '14px', textAlign: 'left' },
  btnEdit: { backgroundColor: '#ffc107', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' },
  btnDelete: { backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
};

export default Members;