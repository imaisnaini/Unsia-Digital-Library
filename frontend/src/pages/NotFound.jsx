import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.title}>Halaman Tidak Ditemukan</h2>
      <p style={styles.description}>
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <Link to="/dashboard" style={styles.button}>
        Kembali ke Dashboard
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    color: '#e6f1ff',
    textAlign: 'center',
    padding: '20px',
  },
  errorCode: {
    fontSize: '8rem',
    fontWeight: 'bold',
    color: '#64ffda',
    margin: 0,
    lineHeight: 1,
  },
  title: {
    fontSize: '2rem',
    margin: '20px 0 10px',
  },
  description: {
    color: '#8892b0',
    marginBottom: '30px',
    fontSize: '1.1rem',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#64ffda',
    border: '1px solid #64ffda',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  },
};

export default NotFound;