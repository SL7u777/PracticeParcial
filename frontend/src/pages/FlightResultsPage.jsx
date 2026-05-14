import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlightCard from '../components/FlightCard';

function FlightResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flights, searchParams } = location.state || {};

  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [selectedOutboundFare, setSelectedOutboundFare] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [selectedReturnFare, setSelectedReturnFare] = useState(null);
  const [error, setError] = useState('');

  if (!flights) {
    navigate('/');
    return null;
  }

  const outboundFlights = flights.outbound || [];
  const returnFlights = flights.return || [];
  const isRound = searchParams?.tripType === 'round';

  const handleSelectOutboundFare = (flightId, fare) => {
    setSelectedOutbound(flightId);
    setSelectedOutboundFare(fare);
    setError('');
  };

  const handleSelectReturnFare = (flightId, fare) => {
    setSelectedReturn(flightId);
    setSelectedReturnFare(fare);
    setError('');
  };

  const getSelectedFlight = (flightId, flightsList) =>
    flightsList.find((f) => f._id === flightId);

  const calculateTotal = () => {
    let total = 0;
    const passengers = parseInt(searchParams?.passengers || 1);
    if (selectedOutbound && selectedOutboundFare) {
      const f = getSelectedFlight(selectedOutbound, outboundFlights);
      if (f) total += f.fares[selectedOutboundFare].price * passengers;
    }
    if (selectedReturn && selectedReturnFare) {
      const f = getSelectedFlight(selectedReturn, returnFlights);
      if (f) total += f.fares[selectedReturnFare].price * passengers;
    }
    return total;
  };

  const handleContinue = () => {
    if (!selectedOutbound || !selectedOutboundFare) {
      setError('Por favor selecciona una tarifa para el vuelo de ida.');
      return;
    }
    if (isRound && returnFlights.length > 0 && (!selectedReturn || !selectedReturnFare)) {
      setError('Por favor selecciona una tarifa para el vuelo de vuelta.');
      return;
    }

    const outbound = getSelectedFlight(selectedOutbound, outboundFlights);
    const ret = selectedReturn ? getSelectedFlight(selectedReturn, returnFlights) : null;

    navigate('/passengers', {
      state: {
        outboundFlight: outbound,
        returnFlight: ret,
        selectedFare: selectedOutboundFare,
        returnFare: selectedReturnFare,
        searchParams,
        totalPrice: calculateTotal(),
      },
    });
  };

  const total = calculateTotal();

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>Selección de vuelos</h2>
        <p style={{ color: '#718096', fontSize: '14px', marginTop: '4px' }}>
          {searchParams?.origin} → {searchParams?.destination} | {searchParams?.departureDate}
          {isRound && searchParams?.returnDate ? ` → ${searchParams?.returnDate}` : ''} | {searchParams?.passengers} pasajero(s)
        </p>
      </div>

      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#2d3748', marginBottom: '12px', padding: '8px 0', borderBottom: '2px solid #e63946' }}>
          ✈ Vuelo de ida: {searchParams?.origin} → {searchParams?.destination}
        </h3>
        {outboundFlights.length === 0 ? (
          <div style={{ backgroundColor: '#fff3cd', padding: '16px', borderRadius: '8px', color: '#856404' }}>
            No hay vuelos disponibles para esta ruta y fecha. Prueba con otra fecha.
          </div>
        ) : (
          outboundFlights.map((flight) => (
            <FlightCard
              key={flight._id}
              flight={flight}
              selectedFare={selectedOutbound === flight._id ? selectedOutboundFare : null}
              onSelectFare={handleSelectOutboundFare}
            />
          ))
        )}
      </div>

      {isRound && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#2d3748', marginBottom: '12px', padding: '8px 0', borderBottom: '2px solid #e63946' }}>
            ✈ Vuelo de vuelta: {searchParams?.destination} → {searchParams?.origin}
          </h3>
          {returnFlights.length === 0 ? (
            <div style={{ backgroundColor: '#fff3cd', padding: '16px', borderRadius: '8px', color: '#856404' }}>
              No hay vuelos de vuelta disponibles para esta fecha. Prueba con otra fecha de regreso.
            </div>
          ) : (
            returnFlights.map((flight) => (
              <FlightCard
                key={flight._id}
                flight={flight}
                selectedFare={selectedReturn === flight._id ? selectedReturnFare : null}
                onSelectFare={handleSelectReturnFare}
              />
            ))
          )}
        </div>
      )}

      {error && (
        <div style={{ backgroundColor: '#fed7d7', color: '#c53030', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          {total > 0 && (
            <>
              <div style={{ fontSize: '13px', color: '#718096' }}>Total de tu reserva</div>
              <div style={{ fontSize: '26px', fontWeight: '700', color: '#1a202c' }}>
                ${total.toFixed(2)} USD
              </div>
              <div style={{ fontSize: '12px', color: '#a0aec0' }}>Todos los impuestos incluidos</div>
            </>
          )}
        </div>
        <button
          onClick={handleContinue}
          style={{
            backgroundColor: '#e63946',
            color: 'white',
            border: 'none',
            padding: '14px 36px',
            borderRadius: '7px',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}

export default FlightResultsPage;
