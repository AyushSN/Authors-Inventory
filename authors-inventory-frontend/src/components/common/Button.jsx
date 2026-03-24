const variants = {
    primary: { background: 'var(--accent)', color: '#0f0e0c', border: 'none', fontWeight: 500 },
    ghost:   { background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' },
    danger:  { background: 'transparent', color: 'var(--danger)', border: '1px solid var(--danger)' },
};

const Button = ({ children, variant = 'primary', loading = false, style = {}, ...props }) => (
    <button
        {...props}
        disabled={loading || props.disabled}
        style={{
        ...variants[variant],
        borderRadius: 'var(--radius)',
        padding: '11px 22px',
        fontSize: 14,
        fontFamily: 'var(--font-ui)',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: (loading || props.disabled) ? 0.6 : 1,
        transition: 'all var(--transition)',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        ...style,
        }}
        onMouseEnter={e => { if (!loading && !props.disabled) e.currentTarget.style.opacity = '0.85'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = (loading || props.disabled) ? '0.6' : '1'; }}
    >
        {loading && (
        <span style={{
            width: 14, height: 14, borderRadius: '50%',
            border: '2px solid rgba(0,0,0,0.3)',
            borderTopColor: '#0f0e0c',
            animation: 'spin 0.7s linear infinite',
            display: 'inline-block',
        }} />
        )}
        {children}
    </button>
);

export default Button;