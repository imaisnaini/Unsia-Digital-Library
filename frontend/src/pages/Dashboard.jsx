import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalLoans: 0,
    activeLoans: 0,
    returnedLoans: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await API.get('/dashboard/summary');
        // Sesuaikan dengan struktur response backend
        const summaryData = res.data.data || res.data; 
      
        setStats(summaryData);
      } catch (err) {
        console.error('Gagal mengambil data statistik:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Konfigurasi Chart.js
  const chartData = {
    labels: ['Total Buku', 'Total Pinjam', 'Sedang Dipinjam', 'Dikembalikan'],
    datasets: [
      {
        label: 'Jumlah Data',
        data: [stats.totalBooks, stats.totalLoans, stats.activeLoans, stats.returnedLoans],
        backgroundColor: ['#3399ff', '#ffc107', '#ff4d4f', '#28a745'],
        borderRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Statistik Aktivitas Perpustakaan', color: '#ffffff' }
    },
    scales: {
      x: { ticks: { color: '#8892b0' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: '#8892b0' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h1 style={styles.pageTitle}>Dashboard Ringkasan</h1>

        {loading ? (
          <p style={{ color: '#fff' }}>Memuat data statistik...</p>
        ) : (
          <>
            {/* Stat Cards */}
            <div style={styles.cardsGrid}>
              <div style={styles.card}>
                <h3>Total Buku</h3>
                <p style={styles.cardValue}>{stats.totalBooks || 0}</p>
              </div>
              <div style={styles.card}>
                <h3>Total Transaksi</h3>
                <p style={styles.cardValue}>{stats.totalLoans || 0}</p>
              </div>
              <div style={styles.card}>
                <h3>Sedang Dipinjam</h3>
                <p style={{ ...styles.cardValue, color: '#ffc107' }}>{stats.activeLoans || 0}</p>
              </div>
              <div style={styles.card}>
                <h3>Dikembalikan</h3>
                <p style={{ ...styles.cardValue, color: '#28a745' }}>{stats.returnedLoans || 0}</p>
              </div>
            </div>

            {/* Chart Area */}
            <div style={styles.chartBox}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#0a192f', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" },
  content: { padding: '30px', maxWidth: '1100px', margin: '0 auto' },
  pageTitle: { color: '#ffffff', marginBottom: '25px' },
  cardsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' },
  card: { backgroundColor: '#112240', padding: '20px', borderRadius: '10px', color: '#ffffff', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' },
  cardValue: { fontSize: '28px', fontWeight: 'bold', marginTop: '10px', color: '#3399ff' },
  chartBox: { backgroundColor: '#112240', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }
};

export default Dashboard;