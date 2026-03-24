import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import { ROUTES } from '../utils/constants';

const StatCard = ({ label, value, delay }) => (
    <div className={`fade-up delay-${delay}`} style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: '24px 28px',
    }}>
        <div style={{ fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--accent)' }}>{value}</div>
    </div>
    );

    const QuickLink = ({ to, title, desc, delay }) => (
    <Link to={to} className={`fade-up delay-${delay}`} style={{
        display: 'block', background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: '20px 24px',
        transition: 'border-color var(--transition)',
    }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
        <div style={{ fontWeight: 500, marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>{desc}</div>
    </Link>
    );

    const DashboardPage = () => {
    const { user } = useAuth();
    const username = user?.sub || 'Author';

    return (
        <PageWrapper>
        <div className="fade-up" style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
            Dashboard
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 400, lineHeight: 1.1 }}>
            Good to see you,<br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{username}.</span>
            </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 40 }}>
            <StatCard label="Username" value={username}   delay={1} />
            <StatCard label="Status"   value="Active"     delay={2} />
            <StatCard label="Member"   value="Since '25"  delay={3} />
        </div>

        <h2 className="fade-up delay-3" style={{
            fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400,
            color: 'var(--muted)', marginBottom: 16,
        }}>
            Quick access
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            <QuickLink to={ROUTES.EDIT_PROFILE} title="Edit Profile" desc="Update your name or email"       delay={3} />
            <QuickLink to={ROUTES.USERS}        title="All Users"    desc="Browse and manage the directory" delay={4} />
        </div>
        </PageWrapper>
    );
};

export default DashboardPage;