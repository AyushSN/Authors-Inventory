import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/common/Loader';
import { ROUTES } from '../utils/constants';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <Loader fullscreen />;
    if (!user) return <Navigate to={ROUTES.LOGIN} replace />;
    return children;
};

export default ProtectedRoute;