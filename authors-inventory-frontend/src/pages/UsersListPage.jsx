import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../services/userService';
import useAuth from '../hooks/useAuth';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

const Avatar = ({ name }) => {
    const initials = name?.slice(0, 2).toUpperCase() || '?';
    return (
        <div style={{
        width: 38, height: 38, borderRadius: '50%',
        background: 'var(--bg3)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 500, color: 'var(--accent)', flexShrink: 0,
        }}>
        {initials}
        </div>
    );
    };

    const UsersListPage = () => {
    const { user: me }            = useAuth();
    const [users,    setUsers]    = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [error,    setError]    = useState('');
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        getAllUsers()
        .then(({ data }) => setUsers(data))
        .catch(() => setError('Failed to load users.'))
        .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (username) => {
        if (!window.confirm(`Remove ${username} permanently?`)) return;
        setDeleting(username);
        try {
        await deleteUser(username);
        setUsers(prev => prev.filter(u => u.username !== username));
        } catch {
        alert('Delete failed.');
        } finally {
        setDeleting(null);
        }
    };

    if (loading) return <Loader fullscreen />;

    return (
        <PageWrapper>
        <div className="fade-up" style={{ marginBottom: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
            <p style={{ fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Directory</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400 }}>All Users</h1>
            </div>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>{users.length} member{users.length !== 1 ? 's' : ''}</span>
        </div>

        {error && <p style={{ color: 'var(--danger)', marginBottom: 24 }}>{error}</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {users.map((u, i) => (
            <div key={u.username}
                className={`fade-up delay-${Math.min(i + 1, 5)}`}
                style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: 14,
                transition: 'border-color var(--transition)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
                <Avatar name={u.username} />
                <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 2 }}>
                    {u.first_name} {u.last_name}
                    {u.username === me?.sub && (
                    <span style={{
                        marginLeft: 8, fontSize: 11, color: 'var(--accent)',
                        border: '1px solid rgba(212,148,58,0.4)',
                        borderRadius: 4, padding: '1px 6px',
                    }}>you</span>
                    )}
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>@{u.username} · {u.email}</div>
                </div>
                {u.username !== me?.sub && (
                <Button variant="danger" loading={deleting === u.username}
                    onClick={() => handleDelete(u.username)}
                    style={{ padding: '6px 14px', fontSize: 13 }}>
                    Remove
                </Button>
                )}
            </div>
            ))}
        </div>
        </PageWrapper>
    );
};

export default UsersListPage;