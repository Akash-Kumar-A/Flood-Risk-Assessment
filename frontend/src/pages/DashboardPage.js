import React from 'react';

function DashboardPage({ user = { email: 'demo@example.com', role: 'Responder' } }) {
  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return '#e74c3c';
      case 'Coordinator': return '#f39c12';
      case 'Responder': return '#27ae60';
      default: return '#34495e';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Admin': return '👨‍💼';
      case 'Coordinator': return '📋';
      case 'Responder': return '🚨';
      default: return '👤';
    }
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f7fa',
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    title: {
      fontSize: '3rem',
      color: '#2c3e50',
      marginBottom: '0.5rem',
      fontWeight: 'bold'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#7f8c8d'
    },
    welcomeCard: {
      backgroundColor: 'white',
      padding: '2.5rem',
      borderRadius: '15px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      textAlign: 'center',
      marginBottom: '2rem'
    },
    userInfo: {
      fontSize: '1.3rem',
      marginBottom: '1rem',
      color: '#2c3e50'
    },
    roleChip: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      borderRadius: '25px',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      marginTop: '1rem'
    },
    sectionTitle: {
      fontSize: '1.8rem',
      color: '#2c3e50',
      marginBottom: '1rem',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    sectionDescription: {
      fontSize: '1rem',
      color: '#7f8c8d',
      textAlign: 'center',
      marginBottom: '2rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginTop: '2rem'
    },
    statCard: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      textAlign: 'center',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    },
    statIcon: {
      fontSize: '3rem',
      marginBottom: '1rem'
    },
    statTitle: {
      fontSize: '1.1rem',
      color: '#2c3e50',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    statDescription: {
      color: '#7f8c8d',
      fontSize: '0.95rem'
    },
    quickActions: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '15px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      marginTop: '2rem'
    },
    quickActionsTitle: {
      fontSize: '1.5rem',
      color: '#2c3e50',
      marginBottom: '0.5rem',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    quickActionsDescription: {
      fontSize: '0.95rem',
      color: '#7f8c8d',
      textAlign: 'center',
      marginBottom: '1.5rem'
    },
    actionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem',
      backgroundColor: '#ecf0f1',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '1rem',
      color: '#2c3e50',
      transition: 'all 0.2s'
    }
  };

  const getQuickActions = (role) => {
    const baseActions = [
      { icon: '🏥', text: 'View Shelters', key: 'shelters' },
      { icon: '📋', text: 'Check Alerts', key: 'alerts' }
    ];

    if (role === 'Admin') {
      return [
        ...baseActions,
        { icon: '📊', text: 'Generate Reports', key: 'reports' },
        { icon: '⚙️', text: 'System Settings', key: 'settings' }
      ];
    }

    if (role === 'Coordinator') {
      return [
        ...baseActions,
        { icon: '🚨', text: 'Create Alert', key: 'create-alert' },
        { icon: '👥', text: 'Manage Team', key: 'team' }
      ];
    }

    return baseActions;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🌍 Flood Management Dashboard</h1>
        <p style={styles.subtitle}>Real-time monitoring and emergency response</p>
      </div>

      <div style={styles.welcomeCard}>
        <div style={styles.userInfo}>
          Welcome back, <strong>{user?.email || 'User'}</strong>!
        </div>
        <div 
          style={{
            ...styles.roleChip,
            backgroundColor: getRoleColor(user?.role || 'Responder')
          }}
        >
          <span>{getRoleIcon(user?.role || 'Responder')}</span>
          {user?.role || 'Responder'}
        </div>
      </div>

      <div>
        <h2 style={styles.sectionTitle}>📊 System Overview</h2>
        <p style={styles.sectionDescription}>
          Click on any section below to access detailed information. All icons are positioned at the top of each card for easy identification.
        </p>
      </div>

      <div style={styles.statsGrid}>
        <div 
          style={styles.statCard}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={styles.statIcon}>🚨</div>
          <div style={styles.statTitle}>Active Alerts</div>
          <div style={styles.statDescription}>
            Monitor current flood warnings and emergency notifications
          </div>
        </div>

        <div 
          style={styles.statCard}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={styles.statIcon}>🏥</div>
          <div style={styles.statTitle}>Relief Shelters</div>
          <div style={styles.statDescription}>
            View available emergency shelters and their capacities
          </div>
        </div>

        <div 
          style={styles.statCard}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={styles.statIcon}>📊</div>
          <div style={styles.statTitle}>Reports</div>
          <div style={styles.statDescription}>
            Generate and download comprehensive flood reports
          </div>
        </div>

        <div 
          style={styles.statCard}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <div style={styles.statIcon}>🗺️</div>
          <div style={styles.statTitle}>Flood Zones</div>
          <div style={styles.statDescription}>
            Interactive mapping of high-risk flood areas
          </div>
        </div>
      </div>

      <div style={styles.quickActions}>
        <h3 style={styles.quickActionsTitle}>⚡ Quick Actions</h3>
        <p style={styles.quickActionsDescription}>
          Access frequently used features quickly. Each action is marked with an icon at the beginning for easy recognition.
        </p>
        <div style={styles.actionGrid}>
          {getQuickActions(user?.role || 'Responder').map((action, idx) => (
            <button
              key={idx}
              style={styles.actionButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#d5dbdb';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ecf0f1';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <span>{action.icon}</span>
              {action.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;