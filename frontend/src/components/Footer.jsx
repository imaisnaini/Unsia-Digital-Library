const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        Copyright © Fatimah Isnaini Shabrina - 250401020073 | 2026
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#0a192f',
    padding: '20px 0',
    textAlign: 'center',
    borderTop: '1px solid #233554',
    marginTop: 'auto', // Memastikan footer tetap di paling bawah
    width: '100%',
  },
  text: {
    color: '#8892b0',
    fontSize: '13px',
    margin: 0,
    fontFamily: "'Segoe UI', sans-serif",
  },
};

export default Footer;