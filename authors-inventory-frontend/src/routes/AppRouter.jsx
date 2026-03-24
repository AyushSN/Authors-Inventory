import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import ProtectedRoute from './ProtectedRoute';
import Navbar from '../components/layout/Navbar';
import LoginPage       from '../pages/LoginPage';
import RegisterPage    from '../pages/RegisterPage';
import DashboardPage   from '../pages/DashboardPage';
import ProfilePage     from '../pages/ProfilePage';
import EditProfilePage from '../pages/EditProfilePage';
import UsersListPage   from '../pages/UsersListPage';

const Protected = ({ children }) => (
    <ProtectedRoute>
        <Navbar />
        {children}
    </ProtectedRoute>
);

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path={ROUTES.LOGIN}        element={<LoginPage />} />
            <Route path={ROUTES.REGISTER}     element={<RegisterPage />} />
            <Route path={ROUTES.DASHBOARD}    element={<Protected><DashboardPage /></Protected>} />
            <Route path={ROUTES.PROFILE}      element={<Protected><ProfilePage /></Protected>} />
            <Route path={ROUTES.EDIT_PROFILE} element={<Protected><EditProfilePage /></Protected>} />
            <Route path={ROUTES.USERS}        element={<Protected><UsersListPage /></Protected>} />
            <Route path="*"                   element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;