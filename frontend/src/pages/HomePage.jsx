import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { flightService } from '../services/api';

function HomePage() {
  const navigate = useNavigate();
  const [airports, setAirports] = useState([]);
  const [form, setForm] = useState({
    tripType: 'round',
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    flightService.getAirports().then((res) => setAirports(res.data)).catch(console.error);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!form.origin || !form.destination || !form.departureDate) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }
    if (form.origin === form.destination) {
      setError('El origen y destino no pueden ser iguales.');
      return;
    }
    if (form.tripType === 'round' && !form.returnDate) {
      setError('Por favor ingresa la fecha de regreso para vuelo de ida y vuelta.');
      return;
    }
    setLoading(true);
    try {
      const params = {
        origin: form.origin,
        destination: form.destination,
        date: form.departureDate,
        returnDate: form.returnDate,
        tripType: form.tripType,
        passengers: form.passengers,
      };
      const res = await flightService.searchFlights(params);
      navigate('/flights', { state: { flights: res.data, searchParams: form } });
    } catch (err) {
      setError('Error al buscar vuelos. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '6px',
    border: '1.5px solid #cbd5e0',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'white',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#718096',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: '60px 20px',
        textAlign: 'center',
        color: 'white',
      }}>
        <h1 style={{ fontSize: '38px', fontWeight: '700', marginBottom: '10px' }}>
          Reserva tu <span style={{ color: '#e63946' }}>vuelo</span>
        </h1>
        <p style={{ fontSize: '16px', color: '#a0aec0' }}>
          Los mejores precios para tu próximo destino
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '-30px auto 40px', padding: '0 20px' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }}>
          <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
            {[{ val: 'round', label: 'Ida y vuelta' }, { val: 'oneway', label: 'Solo ida' }].map(({ val, label }) => (
              <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: form.tripType === val ? '600' : '400' }}>
                <input
                  type="radio"
                  name="tripType"
                  value={val}
                  checked={form.tripType === val}
                  onChange={handleChange}
                  style={{ accentColor: '#e63946' }}
                />
                {label}
              </label>
            ))}
          </div>

          <form onSubmit={handleSearch}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Origen</label>
                <select name="origin" value={form.origin} onChange={handleChange} style={inputStyle} required>
                  <option value="">Seleccionar ciudad</option>
                  {airports.map((a) => (
                    <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Destino</label>
                <select name="destination" value={form.destination} onChange={handleChange} style={inputStyle} required>
                  <option value="">Seleccionar ciudad</option>
                  {airports.map((a) => (
                    <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Fecha de salida</label>
                <input type="date" name="departureDate" value={form.departureDate} onChange={handleChange} style={inputStyle} required min={new Date().toISOString().split('T')[0]} />
              </div>

              {form.tripType === 'round' && (
                <div>
                  <label style={labelStyle}>Fecha de regreso</label>
                  <input type="date" name="returnDate" value={form.returnDate} onChange={handleChange} style={inputStyle} min={form.departureDate || new Date().toISOString().split('T')[0]} />
                </div>
              )}

              <div>
                <label style={labelStyle}>Pasajeros</label>
                <select name="passengers" value={form.passengers} onChange={handleChange} style={inputStyle}>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'adulto' : 'adultos'}</option>
                  ))}
                </select>
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
                padding: '14px 40px',
                borderRadius: '7px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%',
              }}
            >
              {loading ? 'Buscando...' : 'Buscar vuelos'}
            </button>
          </form>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '20px', color: '#718096', fontSize: '13px' }}>
        <p>Rutas populares: Lima → Miami • Lima → Bogotá • Lima → Santiago</p>
      </div>
    </div>
  );
}

export default HomePage;
