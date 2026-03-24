import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/common/Button';
import { ROUTES } from '../utils/constants';

const Field = ({ label, value }) => (
    <div style={{ padding: '18px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 15, color: 'var(--text)' }}>{value || '—'}</div>
    </div>
    );

    const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <PageWrapper>
        <div className="fade-up" style={{ marginBottom: 36 }}>
            <p style={{ fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Profile</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400 }}>
            {user?.sub || 'My Profile'}
            </h1>
        </div>

        <div className="fade-up delay-1" style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '8px 28px 24px',
            marginBottom: 24,
        }}>
            <Field label="Username" value={user?.sub} />
        </div>

        <div className="fade-up delay-2">
            <Link to={ROUTES.EDIT_PROFILE}>
            <Button>Edit Profile</Button>
            </Link>
        </div>
        </PageWrapper>
    );
};

export default ProfilePage;