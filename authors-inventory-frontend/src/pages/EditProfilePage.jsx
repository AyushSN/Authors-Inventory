import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../services/userService';
import PageWrapper from '../components/layout/PageWrapper';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { useState } from 'react';
import { ROUTES } from '../utils/constants';

const EditProfilePage = () => {
    const navigate = useNavigate();
    const [serverErr, setServerErr] = useState('');
    const [success,   setSuccess]   = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
        setServerErr('');
        await updateUser(data);
        setSuccess(true);
        setTimeout(() => navigate(ROUTES.DASHBOARD), 1200);
        } catch (err) {
        setServerErr(err.response?.data?.message || 'Update failed. Please try again.');
        }
    };

    return (
        <PageWrapper>
        <div className="fade-up" style={{ marginBottom: 36 }}>
            <p style={{ fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Account</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400 }}>Edit Profile</h1>
        </div>

        <div className="fade-up delay-1" style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '32px', maxWidth: 480,
        }}>
            {success && (
            <div style={{
                background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.3)',
                borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--success)', marginBottom: 20,
            }}>
                Profile updated! Redirecting…
            </div>
            )}
            {serverErr && (
            <div style={{
                background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.3)',
                borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#e74c3c', marginBottom: 20,
            }}>
                {serverErr}
            </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <InputField label="First Name" type="text" placeholder="Jane"
                error={errors.first_name?.message} {...register('first_name')} />
                <InputField label="Last Name" type="text" placeholder="Austen"
                error={errors.last_name?.message} {...register('last_name')} />
            </div>
            <InputField label="Email" type="email" placeholder="you@example.com"
                error={errors.email?.message} {...register('email')} />
            <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <Button type="submit" loading={isSubmitting}>
                {isSubmitting ? 'Saving…' : 'Save Changes'}
                </Button>
                <Button type="button" variant="ghost" onClick={() => navigate(ROUTES.DASHBOARD)}>
                Cancel
                </Button>
            </div>
            </form>
        </div>
        </PageWrapper>
    );
};

export default EditProfilePage;