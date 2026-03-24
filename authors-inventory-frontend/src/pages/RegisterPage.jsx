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
    first_name: yup.string().required('First name is required'),
    last_name:  yup.string().required('Last name is required'),
    username:   yup.string().min(3, 'At least 3 characters').required('Username is required'),
    email:      yup.string().email('Enter a valid email').required('Email is required'),
    password:   yup.string().min(6, 'At least 6 characters').required('Password is required'),
    });

    const RegisterPage = () => {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const [serverErr, setServerErr] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
        setServerErr('');
        await registerUser(data);
        navigate(ROUTES.DASHBOARD);
        } catch (err) {
        setServerErr(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <AuthShell
        title="Create account"
        subtitle="Join Authors Inventory today."
        footer={<>Already have an account? <Link to={ROUTES.LOGIN} style={{ color: 'var(--accent)' }}>Sign in</Link></>}
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <InputField label="First Name" type="text" placeholder="Jane"
                error={errors.first_name?.message} {...register('first_name')} />
            <InputField label="Last Name"  type="text" placeholder="Austen"
                error={errors.last_name?.message}  {...register('last_name')} />
            </div>
            <InputField label="Username" type="text" placeholder="jane_austen"
            error={errors.username?.message} {...register('username')} />
            <InputField label="Email" type="email" placeholder="you@example.com"
            error={errors.email?.message} {...register('email')} />
            <InputField label="Password" type="password" placeholder="Min. 6 characters"
            error={errors.password?.message} {...register('password')} />
            <Button type="submit" loading={isSubmitting}
            style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>
            {isSubmitting ? 'Creating account…' : 'Create Account'}
            </Button>
        </form>
        </AuthShell>
    );
};

export default RegisterPage;