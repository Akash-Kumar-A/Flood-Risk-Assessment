import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import floodZones from '../data/flood_zones.json';
import shelters from '../data/shelters.json';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapView() {
  const [alerts, setAlerts] = useState([]);

  // Load alerts from localStorage on load
  useEffect(() => {
    const stored = localStorage.getItem('floodAlerts');
    if (stored) {
      try {
        setAlerts(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse floodAlerts:', e);
      }
    }
  }, []);

  // Map severity to color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'red';
      case 'Medium': return 'orange';
      case 'Low': return 'yellow';
      default: return 'gray';
    }
  };

  // Find if this zone has an alert
  const findAlertForZone = (zoneName) => {
    return alerts.find((alert) => alert.zone.trim().toLowerCase() === zoneName.trim().toLowerCase());
  };

  // Style each zone based on alert severity
  const zoneStyle = (feature) => {
    const alert = findAlertForZone(feature.properties.zone);
    if (alert) {
      return {
        fillColor: getSeverityColor(alert.severity),
        color: 'black',
        weight: 2,
        fillOpacity: 0.6,
      };
    }
    return {
      fillColor: 'lightblue',
      color: 'gray',
      weight: 1,
      fillOpacity: 0.2,
    };
  };

  // Popup message for each zone
  const onEachZone = (feature, layer) => {
    const alert = findAlertForZone(feature.properties.zone);
    let popupText = `<b>${feature.properties.zone}</b>`;
    if (alert) {
      popupText += `<br/>⚠️ ${alert.severity} Alert<br/>${alert.message}`;
    }
    layer.bindPopup(popupText);
  };

  return (
    <div>
      <h2>🗺️ Flood Risk Map</h2>
      <MapContainer
        center={[10.85, 76.27]}
        zoom={9}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* Flood zones colored by alert */}
        <GeoJSON data={floodZones} style={zoneStyle} onEachFeature={onEachZone} />

        {/* Shelter markers */}
        {shelters.features.map((feature, idx) => (
          <Marker
            key={idx}
            position={[
              feature.geometry.coordinates[1],
              feature.geometry.coordinates[0],
            ]}
          >
            <Popup>
              <b>{feature.properties.name}</b><br />
              Type: {feature.properties.type}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
