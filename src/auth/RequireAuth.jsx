import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import ApiStatus from '../components/ApiStatus';

export default function RequireAuth({ children }) {
  const { status, error, refresh, isAuthenticated } = useAuth();
  const location = useLocation();
  if (status === 'loading' || status === 'error') return (
    <main className="main-content"><div className="container">
      <ApiStatus loading={status === 'loading'} error={error} retry={refresh} />
    </div></main>
  );
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  return children;
}
