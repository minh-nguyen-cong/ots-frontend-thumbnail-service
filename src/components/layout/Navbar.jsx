import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getInitials = (email) => {
        return email ? email.charAt(0).toUpperCase() : '?';
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">OTS</Link>
                <div className="d-flex">
                    {user ? (
                        <>
                            <span className="navbar-text me-3">Welcome, {user.email}</span>
                            <button onClick={handleLogout} className="btn btn-outline-secondary me-2">Logout</button>
                            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>{getInitials(user.email)}</div>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="btn btn-outline-light me-2">Sign Up</Link>
                            <Link to="/login" className="btn btn-primary">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
