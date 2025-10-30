import ProductManager from '../components/admin/ProductManager';
import TestimonialManager from '../components/admin/TestimonialManager';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </header>
      <div className="admin-content">
        <ProductManager />
        <TestimonialManager />
      </div>
    </div>
  );
};

export default AdminPage;