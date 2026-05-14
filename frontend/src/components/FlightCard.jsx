import React, { useState } from 'react';

const fareColors = {
  light: { bg: '#fff3cd', border: '#ffc107', badge: '#856404' },
  classic: { bg: '#cce5ff', border: '#004085', badge: '#004085' },
  flex: { bg: '#d4edda', border: '#155724', badge: '#155724' },
};

function FlightCard({ flight, selectedFare, onSelectFare, label }) {
  const [expanded, setExpanded] = useState(false);

  if (!flight) return null;

  const fares = ['light', 'classic', 'flex'];

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #e2e8f0',
    }}>
      {label && (
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#718096', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {label}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '700', color: '#1a202c' }}>{flight.departureTime}</div>
            <div style={{ fontSize: '13px', color: '#718096', fontWeight: '600' }}>{flight.origin.code}</div>
            <div style={{ fontSize: '11px', color: '#a0aec0' }}>{flight.origin.city}</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#a0aec0', marginBottom: '4px' }}>{flight.duration}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '40px', height: '2px', backgroundColor: '#cbd5e0' }}></div>
              <span style={{ fontSize: '14px', color: '#4a5568' }}>✈</span>
              <div style={{ width: '40px', height: '2px', backgroundColor: '#cbd5e0' }}></div>
            </div>
            <div style={{ fontSize: '11px', color: '#a0aec0', marginTop: '4px' }}>
              {flight.stops === 0 ? 'Directo' : `${flight.stops} parada${flight.stops > 1 ? 's' : ''}${flight.stopCity ? ` (${flight.stopCity})` : ''}`}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '26px', fontWeight: '700', color: '#1a202c' }}>{flight.arrivalTime}</div>
            <div style={{ fontSize: '13px', color: '#718096', fontWeight: '600' }}>{flight.destination.code}</div>
            <div style={{ fontSize: '11px', color: '#a0aec0' }}>{flight.destination.city}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#a0aec0' }}>Desde</div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#e63946' }}>
              ${flight.fares.light.price.toFixed(2)}
            </div>
            <div style={{ fontSize: '11px', color: '#a0aec0' }}>por pasajero</div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              backgroundColor: expanded ? '#e2e8f0' : '#e63946',
              color: expanded ? '#4a5568' : 'white',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {expanded ? 'Cerrar' : 'Ver tarifas'}
          </button>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {fares.map((fare) => {
            const f = flight.fares[fare];
            const colors = fareColors[fare];
            const isSelected = selectedFare === fare;
            return (
              <div
                key={fare}
                onClick={() => onSelectFare(flight._id, fare)}
                style={{
                  border: `2px solid ${isSelected ? colors.border : '#e2e8f0'}`,
                  borderRadius: '8px',
                  padding: '16px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? colors.bg : 'white',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    textTransform: 'capitalize',
                    color: colors.badge,
                    backgroundColor: isSelected ? 'transparent' : colors.bg,
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}>
                    {fare.charAt(0).toUpperCase() + fare.slice(1)}
                  </span>
                  {isSelected && <span style={{ color: colors.badge, fontSize: '16px' }}>✓</span>}
                </div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginBottom: '10px' }}>
                  ${f.price.toFixed(2)}
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {f.benefits.slice(0, 3).map((b, i) => (
                    <li key={i} style={{ fontSize: '11px', color: '#4a5568', marginBottom: '4px', display: 'flex', gap: '6px' }}>
                      <span style={{ color: colors.badge }}>✓</span> {b}
                    </li>
                  ))}
                </ul>
                <button
                  style={{
                    marginTop: '10px',
                    width: '100%',
                    padding: '8px',
                    backgroundColor: isSelected ? colors.border : '#e63946',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontWeight: '600',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  {isSelected ? 'Seleccionado' : 'Seleccionar'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FlightCard;
