import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservation } = location.state || {};

  if (!reservation) {
    navigate('/');
    return null;
  }

  const { reservationCode, flight, returnFlight, passengers, contact, selectedFare, returnFare, totalPrice, status, createdAt } = reservation;

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px 60px' }}>
      <div style={{
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '10px',
        padding: '24px',
        textAlign: 'center',
        marginBottom: '28px',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>✅</div>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#155724', marginBottom: '6px' }}>
          ¡Reservación Confirmada!
        </h2>
        <p style={{ color: '#155724', fontSize: '14px' }}>
          Tu reservación ha sido procesada exitosamente. Recibirás los detalles en tu correo.
        </p>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '20px',
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#2d3748' }}>Detalles de la reservación</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Código de reserva</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#e63946', letterSpacing: '1px' }}>{reservationCode}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Estado</div>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '3px 10px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'capitalize',
            }}>
              {status}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#718096', marginBottom: '10px', textTransform: 'uppercase' }}>Vuelo de ida</div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '20px', fontWeight: '700' }}>{flight?.departureTime}</div>
              <div style={{ fontSize: '13px', color: '#718096' }}>{flight?.origin?.code} - {flight?.origin?.city}</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '11px', color: '#a0aec0' }}>{flight?.duration}</div>
              <div style={{ borderTop: '2px dashed #cbd5e0', margin: '4px 0' }}></div>
              <div style={{ fontSize: '11px', color: '#a0aec0' }}>
                {flight?.stops === 0 ? 'Directo' : `${flight?.stops} parada(s)`}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '20px', fontWeight: '700' }}>{flight?.arrivalTime}</div>
              <div style={{ fontSize: '13px', color: '#718096' }}>{flight?.destination?.code} - {flight?.destination?.city}</div>
            </div>
          </div>
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#4a5568' }}>
            {flight?.date} | <span style={{ textTransform: 'capitalize', fontWeight: '600' }}>Tarifa {selectedFare}</span>
          </div>
        </div>

        {returnFlight && (
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#718096', marginBottom: '10px', textTransform: 'uppercase' }}>Vuelo de vuelta</div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '700' }}>{returnFlight?.departureTime}</div>
                <div style={{ fontSize: '13px', color: '#718096' }}>{returnFlight?.origin?.code} - {returnFlight?.origin?.city}</div>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '11px', color: '#a0aec0' }}>{returnFlight?.duration}</div>
                <div style={{ borderTop: '2px dashed #cbd5e0', margin: '4px 0' }}></div>
                <div style={{ fontSize: '11px', color: '#a0aec0' }}>
                  {returnFlight?.stops === 0 ? 'Directo' : `${returnFlight?.stops} parada(s)`}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '20px', fontWeight: '700' }}>{returnFlight?.arrivalTime}</div>
                <div style={{ fontSize: '13px', color: '#718096' }}>{returnFlight?.destination?.code} - {returnFlight?.destination?.city}</div>
              </div>
            </div>
            <div style={{ marginTop: '8px', fontSize: '13px', color: '#4a5568' }}>
              {returnFlight?.date} | <span style={{ textTransform: 'capitalize', fontWeight: '600' }}>Tarifa {returnFare}</span>
            </div>
          </div>
        )}

        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#718096', marginBottom: '10px', textTransform: 'uppercase' }}>Pasajero(s)</div>
          {passengers?.map((p, i) => (
            <div key={i} style={{ fontSize: '14px', color: '#2d3748', marginBottom: '4px' }}>
              {i + 1}. {p.firstName} {p.lastName} — {p.gender === 'M' ? 'Masculino' : 'Femenino'}
            </div>
          ))}
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#718096' }}>📧 {contact?.email}</div>
          {contact?.phone && <div style={{ fontSize: '13px', color: '#718096' }}>📞 {contact?.phone}</div>}
        </div>

        <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#2d3748' }}>Total pagado</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#e63946' }}>${totalPrice?.toFixed(2)} USD</div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#e63946',
            color: 'white',
            border: 'none',
            padding: '14px 40px',
            borderRadius: '7px',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          Hacer otra reservación
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPage;
