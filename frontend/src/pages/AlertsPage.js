import React, { useEffect, useState } from 'react';
import floodZones from '../data/flood_zones.json'; // ✅ Import GeoJSON zones

function AlertsPage({ user }) {
  const [alerts, setAlerts] = useState([]);
  const [zone, setZone] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load alerts from localStorage (only once)
  useEffect(() => {
    const stored = localStorage.getItem('floodAlerts');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setAlerts(parsed);
        }
      } catch (e) {
        console.error("Error parsing floodAlerts:", e);
      }
    }
    setHasLoaded(true);
  }, []);

  // Save alerts to localStorage only after initial load
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem('floodAlerts', JSON.stringify(alerts));
    }
  }, [alerts, hasLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAlert = {
      id: Date.now(),
      zone,
      message,
      severity,
      time: new Date().toLocaleString(),
      acknowledged: false,
    };
    setAlerts([newAlert, ...alerts]);
    setZone('');
    setMessage('');
    setSeverity('Medium');
  };

  const handleAcknowledge = (id) => {
    const updated = alerts.map((alert) =>
      alert.id === id ? { ...alert, acknowledged: true } : alert
    );
    setAlerts(updated);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return '#ff4444';
      case 'Medium': return '#ff8c00';
      case 'Low': return '#4caf50';
      default: return '#666';
    }
  };

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f7fa',
      minHeight: '100vh'
    },
    header: {
      color: '#2c3e50',
      marginBottom: '2rem',
      textAlign: 'center',
      fontSize: '2rem'
    },
    formContainer: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
      color: '#2c3e50'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e1e8ed',
      borderRadius: '8px',
      fontSize: '1rem',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e1e8ed',
      borderRadius: '8px',
      fontSize: '1rem',
      boxSizing: 'border-box',
      resize: 'vertical'
    },
    submitBtn: {
      backgroundColor: '#e74c3c',
      color: 'white',
      padding: '0.75rem 2rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    alertsSection: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    alertCard: {
      border: '1px solid #e1e8ed',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1rem',
      backgroundColor: '#fafbfc',
      position: 'relative'
    },
    severityBadge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      color: 'white',
      fontSize: '0.875rem',
      fontWeight: 'bold'
    },
    alertInfo: {
      marginBottom: '0.5rem',
      fontSize: '0.95rem'
    },
    alertLabel: {
      fontWeight: 'bold',
      color: '#2c3e50'
    },
    acknowledgeBtn: {
      backgroundColor: '#27ae60',
      color: 'white',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginTop: '1rem'
    },
    noAlerts: {
      textAlign: 'center',
      color: '#7f8c8d',
      fontSize: '1.1rem',
      padding: '2rem'
    }
  };

  return (
    <div style={styles.container}>
      {(user?.role === 'Coordinator' || user?.role === 'Admin') && (
        <div style={styles.formContainer}>
          <h2 style={styles.header}>🚨 Submit Flood Alert</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Flood Zone:</label>
              <select 
                style={styles.input} 
                value={zone} 
                onChange={(e) => setZone(e.target.value)} 
                required
              >
                <option value="">Select a flood zone</option>
                {floodZones.features.map((f, idx) => (
                  <option key={idx} value={f.properties.zone}>
                    {f.properties.zone}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Message:</label>
              <textarea
                style={styles.textarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Enter alert message..."
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Severity:</label>
              <select 
                style={styles.input} 
                value={severity} 
                onChange={(e) => setSeverity(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <button type="submit" style={styles.submitBtn}>
              Submit Alert
            </button>
          </form>
        </div>
      )}

      <div style={styles.alertsSection}>
        <h3 style={{ ...styles.header, fontSize: '1.5rem', marginBottom: '1.5rem' }}>
          📋 Active Alerts
        </h3>
        {alerts.length === 0 ? (
          <div style={styles.noAlerts}>No alerts submitted yet.</div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} style={styles.alertCard}>
              <div 
                style={{
                  ...styles.severityBadge,
                  backgroundColor: getSeverityColor(alert.severity)
                }}
              >
                {alert.severity}
              </div>
              <div style={styles.alertInfo}>
                <span style={styles.alertLabel}>Zone:</span> {alert.zone}
              </div>
              <div style={styles.alertInfo}>
                <span style={styles.alertLabel}>Message:</span> {alert.message}
              </div>
              <div style={styles.alertInfo}>
                <span style={styles.alertLabel}>Status:</span> {' '}
                {alert.acknowledged ? '✅ Acknowledged' : '⏳ Not Acknowledged'}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#7f8c8d', marginTop: '0.5rem' }}>
                {alert.time}
              </div>
              {user?.role === 'Responder' && !alert.acknowledged && (
                <button 
                  style={styles.acknowledgeBtn}
                  onClick={() => handleAcknowledge(alert.id)}
                >
                  Mark as Acknowledged
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AlertsPage;