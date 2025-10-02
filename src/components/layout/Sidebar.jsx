import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px', height: 'calc(100vh - 56px)' /* Adjust 56px to your navbar's height */ }}>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="/images" className="nav-link" aria-current="page">
                        <i className="bi bi-images me-2"></i>
                        My Images
                    </NavLink>
                </li>
                {/* Future links for logged-in users can be added here */}
            </ul>
        </div>
    );
};

export default Sidebar;