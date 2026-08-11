import React, { useEffect, useState } from 'react';
import API from '../services/api'; // Sesuaikan lokasi api instance kamu
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement
);

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalBooks: 0,
    totalMembers: 0,
    totalLoans: 0,
    activeLoans: 0,
    returnedLoans: 0,
  });
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await API.get('/dashboard/summary');
      if (res.data) {
        if (res.data.summary) setSummary(res.data.summary);
        if (res.data.categoryStats) setCategoryData(res.data.categoryStats);
      }
    } catch (error) {
      console.error('Gagal memuat dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  // Setup Data Grafik Kategori Buku (Doughnut Chart)
  const categoryChartData = {
    labels: categoryData.map(item => item._id),
    datasets: [
      {
        label: 'Jumlah Buku',
        data: categoryData.map(item => item.count),
        backgroundColor: [
          '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Setup Data Grafik Peminjaman (Bar Chart khusus Peminjaman)
  const loanChartData = {
    labels: ['Sedang Dipinjam', 'Sudah Dikembalikan'],
    datasets: [
      {
        label: 'Jumlah Transaksi',
        data: [summary.activeLoans, summary.returnedLoans],
        backgroundColor: ['#eab308', '#22c55e'],
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#ffffff' }
      }
    },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } }
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#0a192f', minHeight: '100vh', color: '#fff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '32px', fontSize: '2rem', fontWeight: 'bold' }}>
        Dashboard Ringkasan
      </h1>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Memuat data dashboard...</p>
      ) : (
        <>
          {/* 4 Kartu Statistik */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}>Total Buku</h3>
              <p style={{ ...cardNumberStyle, color: '#60a5fa' }}>{summary.totalBooks}</p>
            </div>
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}>Total Member</h3>
              <p style={{ ...cardNumberStyle, color: '#34d399' }}>{summary.totalMembers}</p>
            </div>
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}>Sedang Dipinjam</h3>
              <p style={{ ...cardNumberStyle, color: '#facc15' }}>{summary.activeLoans}</p>
            </div>
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}>Dikembalikan</h3>
              <p style={{ ...cardNumberStyle, color: '#4ade80' }}>{summary.returnedLoans}</p>
            </div>
          </div>

          {/* Grid 2 Kolom Grafik */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Grafik 1: Kategori Buku */}
            <div style={chartCardStyle}>
              <h3 style={{ marginBottom: '16px', fontSize: '1.1rem', textAlign: 'center' }}>
                Koleksi Buku per Kategori
              </h3>
              <div style={{ width: '70%', margin: '0 auto' }}>
                {categoryData.length > 0 ? (
                  <Doughnut data={categoryChartData} />
                ) : (
                  <p style={{ textAlign: 'center', color: '#94a3b8' }}>Belum ada data kategori</p>
                )}
              </div>
            </div>

            {/* Grafik 2: Status Peminjaman */}
            <div style={chartCardStyle}>
              <h3 style={{ marginBottom: '16px', fontSize: '1.1rem', textAlign: 'center' }}>
                Statistik Transaksi Peminjaman
              </h3>
              <Bar data={loanChartData} options={chartOptions} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Style Helpers
const cardStyle = {
  backgroundColor: '#112240',
  padding: '20px',
  borderRadius: '12px',
  textAlign: 'center',
  border: '1px solid #233554',
};

const cardTitleStyle = {
  fontSize: '1rem',
  fontWeight: '600',
  marginBottom: '8px',
  color: '#e2e8f0',
};

const cardNumberStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  margin: 0,
};

const chartCardStyle = {
  backgroundColor: '#112240',
  padding: '24px',
  borderRadius: '12px',
  border: '1px solid #233554',
};

export default Dashboard;