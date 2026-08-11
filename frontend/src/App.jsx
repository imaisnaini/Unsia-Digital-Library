import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Member from './pages/Members';
import Loans from './pages/Loans';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import MainLayout from './components/MainLayout'; // 1. Import MainLayout

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0a192f' }}>
          <Routes>
            {/* Halaman tanpa Navbar */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Halaman Terproteksi dengan Navbar */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Books />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/members"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Member />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/loans"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Loans />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>

          {/* Footer tetap tampil global di semua halaman */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;