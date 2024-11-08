import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();

  if (!currentUser || !currentUser.emailVerified) {
    return <Navigate to="/signup" />;
  }

  return <>{children}</>;
}