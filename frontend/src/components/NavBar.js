import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ role, onLogout }) {
  return (
    <nav style={{
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
        <Link to="/map" style={{ marginRight: '1rem' }}>Map</Link>

        {/* Always show Shelters tab */}
        <Link to="/shelters" style={{ marginRight: '1rem' }}>Shelters</Link>

        {/* Show Alerts to all roles */}
        <Link to="/alerts" style={{ marginRight: '1rem' }}>Alerts</Link>

        {/* Show Reports only for Admin */}
        {role === 'Admin' && (
          <Link to="/reports" style={{ marginRight: '1rem' }}>Reports</Link>
        )}
      </div>

      {/* Logout button aligned to the right */}
      <Link to="/" onClick={onLogout} style={{ color: 'red' }}>
        Logout
      </Link>
    </nav>
  );
}

export default NavBar;
