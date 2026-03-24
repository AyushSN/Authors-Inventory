import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

const NAV_LINKS = [
    { to: ROUTES.DASHBOARD, label: 'Dashboard' },
    { to: ROUTES.PROFILE,   label: 'Profile'   },
    { to: ROUTES.USERS,     label: 'All Users'  },
];

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate         = useNavigate();
    const { pathname }     = useLocation();

    const handleLogout = () => { logout(); navigate(ROUTES.LOGIN); };

    return (
        <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(15,14,12,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 60,
        }}>
        <Link to={ROUTES.DASHBOARD} style={{
            fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--accent)',
        }}>
            Authors Inventory
        </Link>

        {user && (
            <div style={{ display: 'flex', gap: 4 }}>
            {NAV_LINKS.map(({ to, label }) => (
                <Link key={to} to={to} style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 14,
                color: pathname === to ? 'var(--accent)' : 'var(--muted)',
                background: pathname === to ? 'rgba(212,148,58,0.1)' : 'transparent',
                transition: 'all var(--transition)',
                fontWeight: pathname === to ? 500 : 400,
                }}>
                {label}
                </Link>
            ))}
            </div>
        )}

        {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>
                {user.sub || user.email || 'User'}
            </span>
            <button onClick={handleLogout} style={{
                background: 'transparent', border: '1px solid var(--border)',
                color: 'var(--muted)', borderRadius: 8, padding: '5px 12px',
                fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-ui)',
                transition: 'all var(--transition)',
            }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--danger)'; e.currentTarget.style.color = 'var(--danger)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
            >
                Sign out
            </button>
            </div>
        )}
        </nav>
    );
};

export default Navbar;