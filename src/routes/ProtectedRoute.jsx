import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../components/layout/DashboardLayout';

const ProtectedRoute = ({ children }) => {
    const { token, loading } = useAuth();

    if (loading) {
        return <div className="container mt-5 text-center"><h2>Loading...</h2></div>;
    }

    return token ? <DashboardLayout>{children}</DashboardLayout> : <Navigate to="/login" />;
};

export default ProtectedRoute;
