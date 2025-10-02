import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="d-flex">
            <Sidebar />
            <main className="container-fluid p-4" style={{ flexGrow: 1, overflowY: 'auto', height: 'calc(100vh - 56px)' }}>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;