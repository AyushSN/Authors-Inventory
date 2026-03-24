import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthShell from '../components/layout/AuthShell';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { ROUTES } from '../utils/constants';

const schema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().min(6, 'At least 6 characters').required('Password is required'),
    });

    const LoginPage = () => {
    const { login }  = useAuth();
    const navigate   = useNavigate();
    const [serverErr, setServerErr] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
        setServerErr('');
        await login(data);
        navigate(ROUTES.DASHBOARD);
        } catch (err) {
        setServerErr(err.response?.data?.message || 'Invalid credentials. Please try again.');
        }
    };

    return (
        <AuthShell
        title="Welcome back"
        subtitle="Sign in to your account to continue."
        footer={<>No account? <Link to={ROUTES.REGISTER} style={{ color: 'var(--accent)' }}>Create one</Link></>}
        >
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {serverErr && (
            <div style={{
                background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.3)',
                borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#e74c3c',
            }}>
                {serverErr}
            </div>
            )}
            <InputField label="Username" type="text" placeholder="your_username"
            error={errors.username?.message} {...register('username')} />
            <InputField label="Password" type="password" placeholder="••••••••"
            error={errors.password?.message} {...register('password')} />
            <Button type="submit" loading={isSubmitting}
            style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>
            {isSubmitting ? 'Signing in…' : 'Sign In'}
            </Button>
        </form>
        </AuthShell>
    );
};

export default LoginPage;