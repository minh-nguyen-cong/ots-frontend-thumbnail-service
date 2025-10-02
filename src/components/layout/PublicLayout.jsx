import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from './DashboardLayout';

const PublicLayout = ({ children }) => {
    const { token, loading } = useAuth();

    if (loading) {
        return <div className="container mt-5 text-center"><h2>Loading...</h2></div>;
    }

    if (token) {
        // If the user is logged in, wrap the public page in the dashboard layout
        return <DashboardLayout>{children}</DashboardLayout>;
    }

    return <>{children}</>; // Otherwise, just show the public page
};

export default PublicLayout;
