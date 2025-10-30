import { useState } from 'react';
import { login } from '../../services/authService';
import './AdminLogin.css';

// --- ADD YOUR FIXED ADMIN EMAIL HERE ---
const ADMIN_EMAIL = "ramsapuri@gmail.com"; // <-- IMPORTANT: Replace with your actual admin email

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // --- NEW CHECK: Only proceed if the email matches the admin email ---
    if (email.toLowerCase() !== ADMIN_EMAIL) {
      setError("This email address is not authorized for admin access.");
      return; // Stop the login process
    }

    try {
      await login(email, password);
      // On success, the ProtectedRoute will handle the redirect
    } catch (err) {
      // Updated error for wrong password
      setError("Login failed. Please check your password.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Admin Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="btn btn-primary">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;