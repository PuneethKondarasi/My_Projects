import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaUserCircle, FaEye, FaEyeSlash, FaHistory, FaVideo, FaEdit, FaKey, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const [userData, setUserData] = useState(auth?.user || {});
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // API configuration with error handling
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const api = axios.create({
    baseURL: `${API_URL}/api`
  });

  // Add interceptor to handle common response patterns
  api.interceptors.response.use(
    response => response.data,
    error => {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  );

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth?.user?._id || !auth?.token) {
        setLoading(false);
        return;
      }

      try {
        const config = { headers: { Authorization: `Bearer ${auth.token}` } };
        
        // Fetch user data
        const userData = await api.get(`/user/${auth.user._id}`, config);
        setUserData(userData);
        setFormData({ 
          username: userData.username, 
          email: userData.email,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        // Fetch search history
        const searchData = await api.get(`/user/${auth.user._id}/search-history`, config);
        setSearchHistory(searchData || []);
        
        // Fetch watch history
        const watchData = await api.get(`/user/${auth.user._id}/watch-history`, config);
        setWatchHistory(watchData || []);
      } catch (err) {
        setError('Could not load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear messages when typing
    setMessage('');
    setError('');
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleUpdate = async () => {
    if (!auth?.user?._id || !auth?.token) return;
    
    try {
      setError('');
      setMessage('');
      
      const updatedData = {
        username: formData.username,
        email: formData.email
      };

      const response = await api.put(
        `/user/${auth.user._id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      setUserData(response);
      setAuth({ ...auth, user: response });
      
      // Update local storage
      const storedAuth = JSON.parse(localStorage.getItem('auth'));
      if (storedAuth) {
        localStorage.setItem('auth', JSON.stringify({ ...storedAuth, user: response }));
      }
      
      setEditMode(false);
      setMessage('Profile updated successfully');
    } catch (err) {
      console.error('Update Error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update profile';
      setError(errorMessage);
    }
  };

  const handlePasswordChange = async () => {
    if (!auth?.user?._id || !auth?.token) return;
    
    // Form validation
    if (!formData.currentPassword) {
      setError('Current password is required');
      return;
    }
    
    if (!formData.newPassword || !formData.confirmPassword) {
      setError('New password and confirmation are required');
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (formData.newPassword === formData.currentPassword) {
      setError('New password must be different from current password');
      return;
    }

    try {
      setError('');
      setMessage('');
      
      const passwordData = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      };

      const response = await api.put(
        `/user/${auth.user._id}/change-password`,
        passwordData,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      if (response) {
        // Reset password fields
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        setPasswordMode(false);
        setMessage('Password updated successfully');
      }
    } catch (err) {
      // Handle specific error cases
      if (err.response?.status === 401) {
        setError('Current password is incorrect');
      } else {
        setError(err.response?.data?.message || 'Failed to update password');
      }
      
      // Clear password fields for security
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setPasswordMode(false);
    setFormData({
      username: userData.username,
      email: userData.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setError('');
    setMessage('');
  };

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 glass rounded-2xl">
          <h2 className="text-2xl font-bold text-destructive mb-4">Access Denied</h2>
          <p className="text-muted-foreground">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative overflow-hidden group">
                  <FaUserCircle className="w-24 h-24 text-primary/50" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-white text-xs">Change Photo</span>
                  </div>
                </div>
                <h2 className="text-2xl font-display font-bold">{userData.username}</h2>
                <p className="text-muted-foreground">{userData.email}</p>
              </div>

              {message && (
                <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 text-green-600 rounded-lg text-sm text-center">
                  {message}
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              {!editMode && !passwordMode ? (
                <div className="space-y-3">
                  <button 
                    onClick={() => setEditMode(true)}
                    className="btn btn-secondary w-full flex items-center justify-center gap-2"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                  <button 
                    onClick={() => setPasswordMode(true)}
                    className="btn w-full flex items-center justify-center gap-2 border border-input hover:bg-accent hover:text-accent-foreground"
                  >
                    <FaKey /> Change Password
                  </button>
                </div>
              ) : editMode ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={handleUpdate}
                      className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      <FaSave /> Save
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="btn btn-secondary flex-1 flex items-center justify-center gap-2"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword.current ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="input pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword.new ? 'text' : 'password'}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="input pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showPassword.confirm ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="input pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={handlePasswordChange}
                      className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      <FaSave /> Update
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="btn btn-secondary flex-1 flex items-center justify-center gap-2"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* History Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search History */}
            <div className="card p-6">
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <FaHistory className="text-primary" /> Recent Searches
              </h3>
              {searchHistory.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((item, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm hover:bg-secondary/20 transition-colors cursor-default"
                    >
                      {item.query}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm italic">No search history yet.</p>
              )}
            </div>

            {/* Watch History */}
            <div className="card p-6">
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <FaVideo className="text-primary" /> Watch History
              </h3>
              {watchHistory.length > 0 ? (
                <div className="space-y-4">
                  {watchHistory.map((item, index) => (
                    <div key={index} className="flex gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors group">
                      <div className="w-32 h-20 flex-shrink-0 rounded-md overflow-hidden relative">
                        <img 
                          src={item.videoThumbnail || 'https://via.placeholder.com/320x180'} 
                          alt={item.videoTitle} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">{item.videoTitle}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{item.videoChannel}</p>
                        <p className="text-xs text-muted-foreground/70">
                          Watched on {new Date(item.watchedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm italic">No watch history yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
