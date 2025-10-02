import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await authApi.register(email, password);
            navigate('/login'); // Redirect to login after successful registration
        } catch (err) {
            setError('Failed to register. The user might already exist.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Register</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" placeholder="Password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
