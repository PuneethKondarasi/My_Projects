import { useAuth } from '../hooks/useAuth';
import AdminLogin from '../components/admin/AdminLogin';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    // If user is not logged in, show the login component
    return <AdminLogin />;
  }

  // If user is logged in, show the protected content
  return children;
};

export default ProtectedRoute;