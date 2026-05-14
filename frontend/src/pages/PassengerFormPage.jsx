import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { reservationService } from '../services/api';

function PassengerFormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { outboundFlight, returnFlight, selectedFare, returnFare, searchParams, totalPrice } = location.state || {};

  const passengerCount = parseInt(searchParams?.passengers || 1);

  const emptyPassenger = { firstName: '', lastName: '', gender: 'M', birthDate: '', documentNumber: '' };
  const [passengers, setPassengers] = useState(Array.from({ length: passengerCount }, () => ({ ...emptyPassenger })));
  const [contact, setContact] = useState({ email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!outboundFlight) {
    navigate('/');
    return null;
  }

  const updatePassenger = (index, field, value) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.firstName || !p.lastName || !p.birthDate) {
        setError(`Completa todos los campos del pasajero ${i + 1}.`);
        return;
      }
    }
    if (!contact.email) {
      setError('El correo electrónico es requerido.');
      return;
    }

    setLoading(true);
    try {
      const reservationData = {
        flight: outboundFlight._id,
        returnFlight: returnFlight?._id || null,
        tripType: searchParams?.tripType || 'round',
        passengers,
        contact,
        selectedFare,
        returnFare: returnFare || selectedFare,
        totalPrice,
      };

      const res = await reservationService.createReservation(reservationData);
      navigate('/confirmation', { state: { reservation: res.data.reservation } });
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear la reservación.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1.5px solid #cbd5e0',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#718096',
    marginBottom: '5px',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  };

  return (
    <div style={{ maxWidth: '860px', margin: '30px auto', padding: '0 20px 40px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px' }}>Información de pasajeros</h2>
      <p style={{ color: '#718096', fontSize: '14px', marginBottom: '24px' }}>
        Ingresa los datos tal como aparecen en el documento de identidad
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
        <div>
          <form onSubmit={handleSubmit}>
            {passengers.map((p, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '24px',
                marginBottom: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#2d3748' }}>
                  Pasajero {i + 1} — Adulto
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Nombre(s)</label>
                    <input style={inputStyle} value={p.firstName} onChange={(e) => updatePassenger(i, 'firstName', e.target.value)} required placeholder="Juan" />
                  </div>
                  <div>
                    <label style={labelStyle}>Apellido(s)</label>
                    <input style={inputStyle} value={p.lastName} onChange={(e) => updatePassenger(i, 'lastName', e.target.value)} required placeholder="Ramos" />
                  </div>
                  <div>
                    <label style={labelStyle}>Género</label>
                    <select style={inputStyle} value={p.gender} onChange={(e) => updatePassenger(i, 'gender', e.target.value)}>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Fecha de nacimiento</label>
                    <input type="date" style={inputStyle} value={p.birthDate} onChange={(e) => updatePassenger(i, 'birthDate', e.target.value)} required />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>N° de documento (DNI/Pasaporte)</label>
                    <input style={inputStyle} value={p.documentNumber} onChange={(e) => updatePassenger(i, 'documentNumber', e.target.value)} placeholder="Opcional" />
                  </div>
                </div>
              </div>
            ))}

            <div style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '24px',
              marginBottom: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#2d3748' }}>
                Titular de la reserva
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Correo electrónico *</label>
                  <input type="email" style={inputStyle} value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} required placeholder="juan@ejemplo.com" />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Teléfono</label>
                  <input style={inputStyle} value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="+51 999 999 999" />
                </div>
              </div>
            </div>

            {error && (
              <div style={{ backgroundColor: '#fed7d7', color: '#c53030', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '14px' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: loading ? '#a0aec0' : '#e63946',
                color: 'white',
                border: 'none',
                padding: '14px',
                borderRadius: '7px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%',
              }}
            >
              {loading ? 'Procesando...' : 'Confirmar reservación'}
            </button>
          </form>
        </div>

        <div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            position: 'sticky',
            top: '20px',
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: '#2d3748' }}>Resumen de viaje</h3>

            <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12px', color: '#718096', marginBottom: '4px' }}>VUELO DE IDA</div>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>{outboundFlight.origin.code} → {outboundFlight.destination.code}</div>
              <div style={{ fontSize: '13px', color: '#4a5568' }}>{outboundFlight.departureTime} → {outboundFlight.arrivalTime}</div>
              <div style={{ fontSize: '12px', color: '#a0aec0' }}>{outboundFlight.date}</div>
              <span style={{ fontSize: '11px', fontWeight: '600', backgroundColor: '#e2e8f0', padding: '2px 8px', borderRadius: '3px', textTransform: 'capitalize' }}>
                {selectedFare}
              </span>
            </div>

            {returnFlight && (
              <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', color: '#718096', marginBottom: '4px' }}>VUELO DE VUELTA</div>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>{returnFlight.origin.code} → {returnFlight.destination.code}</div>
                <div style={{ fontSize: '13px', color: '#4a5568' }}>{returnFlight.departureTime} → {returnFlight.arrivalTime}</div>
                <div style={{ fontSize: '12px', color: '#a0aec0' }}>{returnFlight.date}</div>
                <span style={{ fontSize: '11px', fontWeight: '600', backgroundColor: '#e2e8f0', padding: '2px 8px', borderRadius: '3px', textTransform: 'capitalize' }}>
                  {returnFare}
                </span>
              </div>
            )}

            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: '#718096' }}>Pasajeros</span>
              <span>{passengerCount}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700', marginTop: '12px', paddingTop: '12px', borderTop: '2px solid #e2e8f0' }}>
              <span>Total</span>
              <span style={{ color: '#e63946' }}>${totalPrice?.toFixed(2)} USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengerFormPage;
