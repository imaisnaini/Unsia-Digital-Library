import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal, periksa email/password');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Login UNSIA Library</h2>
        {error && <p style={styles.error}>{error}</p>}
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="masukkan email..."
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="masukkan password..."
          />
        </div>
        
        <button type="submit" style={styles.button}>Login</button>
        
        <p style={styles.footerText}>
          Belum punya akun? <Link to="/register" style={styles.link}>Daftar disini</Link>
        </p>
      </form>
    </div>
  );
};

// --- CONFIG THEME WARNA BARU ---
const colors = {
  pageBg: '#0a192f',      // Deep Navy (Latar Halaman)
  cardBg: '#112240',      // Grey Navy (Kotak Modal, lebih terang)
  inputBg: '#e0e0e0',     // Light Grey (Kolom Teks)
  inputText: '#333333',   // Gelap (Teks dalam Input)
  textMain: '#ffffff',    // White (Judul & Label)
  textSecondary: '#8892b0', // Greyish (Teks Bawah)
  accent: '#007bff',      // Blue (Tombol)
  link: '#3399ff'         // Lighter Blue (Link)
};

const styles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    backgroundColor: colors.pageBg, 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  card: { 
    padding: '40px', 
    borderRadius: '12px', 
    backgroundColor: colors.cardBg, 
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)', 
    width: '380px',
    textAlign: 'center'
  },
  title: { 
    color: colors.textMain, 
    marginBottom: '30px',
    fontWeight: '600'
  },
  error: { 
    color: '#ff6b6b', 
    fontSize: '14px', 
    backgroundColor: 'rgba(255,107,107,0.1)',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px' 
  },
  inputGroup: { 
    marginBottom: '20px', 
    display: 'flex', 
    flexDirection: 'column',
    textAlign: 'left'
  },
  label: {
    color: colors.textMain, 
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500'
  },
  input: { 
    padding: '12px 15px', 
    borderRadius: '6px', 
    border: 'none', 
    backgroundColor: colors.inputBg, 
    color: colors.inputText,
    fontSize: '15px',
    outline: 'none'
  },
  button: { 
    width: '100%', 
    padding: '12px', 
    backgroundColor: colors.accent, 
    color: '#fff', 
    border: 'none', 
    borderRadius: '6px', 
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '10px',
    transition: 'background-color 0.2s'
  },
  footerText: { 
    marginTop: '25px',
    color: colors.textSecondary,
    fontSize: '14px'
  },
  link: {
    color: colors.link,
    textDecoration: 'none',
    fontWeight: '500'
  }
};

export default Login;