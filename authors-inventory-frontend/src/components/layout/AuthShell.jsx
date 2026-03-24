const AuthShell = ({ title, subtitle, children, footer }) => (
    <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)',
        backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,148,58,0.07) 0%, transparent 70%)',
        padding: '24px',
    }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--accent)' }}>
            Authors Inventory
            </span>
        </div>

        <div className="fade-up delay-1" style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px 32px',
            boxShadow: 'var(--shadow)',
        }}>
            <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 26,
            fontWeight: 400, marginBottom: 6, color: 'var(--text)',
            }}>
            {title}
            </h1>
            {subtitle && (
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 28 }}>{subtitle}</p>
            )}
            {children}
        </div>

        {footer && (
            <p className="fade-up delay-2" style={{
            textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--muted)',
            }}>
            {footer}
            </p>
        )}
        </div>
    </div>
);

export default AuthShell;