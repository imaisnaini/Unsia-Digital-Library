import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0a192f' }}>
      {/* Navbar hanya muncul di halaman yang dibungkus MainLayout */}
      <Navbar />
      
      {/* Area Isi Halaman */}
      <main style={{ flex: 1, paddingBottom: '30px' }}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;