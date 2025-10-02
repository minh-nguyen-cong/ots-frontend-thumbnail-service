import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await authApi.register(email, password);
            navigate('/login'); // Redirect to login after successful registration
        } catch (err) {
            setError(t('register.error'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>{t('register.title')}</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="email" className="form-control" placeholder={t('register.emailPlaceholder')} value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" placeholder={t('register.passwordPlaceholder')} className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? t('register.loading') : t('register.submit')}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
