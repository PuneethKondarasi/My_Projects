import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutMain from './layouts/LayoutMain';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FeedbackPage from './pages/FeedbackPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './layouts/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<LayoutMain />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Route>

        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } 
        />
        
      </Routes>
    </Router>
  );
}

export default App;