const InputField = ({ label, error, ...props }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {label && (
        <label style={{
            fontSize: 12, fontWeight: 500, color: 'var(--muted)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
            {label}
        </label>
        )}
        <input
        {...props}
        style={{
            background: 'var(--bg3)',
            border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
            borderRadius: 'var(--radius)',
            color: 'var(--text)',
            fontSize: 15,
            padding: '11px 14px',
            outline: 'none',
            transition: 'border-color var(--transition)',
            width: '100%',
        }}
        onFocus={e  => { if (!error) e.target.style.borderColor = 'var(--accent)'; }}
        onBlur={e   => { if (!error) e.target.style.borderColor = 'var(--border)'; }}
        />
        {error && <span style={{ fontSize: 12, color: 'var(--danger)' }}>{error}</span>}
    </div>
);

export default InputField;