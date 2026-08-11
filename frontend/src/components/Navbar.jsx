import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        <h2>UNSIA Digital Library</h2>
      </div>
      <div style={styles.menu}>
        <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
        <Link to="/books" style={styles.navLink}>Buku</Link>
        <Link to="/members" style={styles.Link}>Member</Link>
        <Link to="/loans" style={styles.navLink}>Peminjaman</Link>
      </div>
      <div style={styles.userInfo}>
        <span style={styles.userName}>Halo, {user?.name || 'User'}</span>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#112240', // Grey Navy
    color: '#ffffff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  },
  brand: { fontSize: '18px', fontWeight: 'bold' },
  menu: { display: 'flex', gap: '20px' },
  navLink: { color: '#8892b0', textDecoration: 'none', fontWeight: '500', fontSize: '16px' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '15px' },
  userName: { color: '#64ffda', fontWeight: '500' },
  logoutBtn: {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  }
};

export default Navbar;