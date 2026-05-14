import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const flightService = {
  searchFlights: (params) => api.get('/flights/search', { params }),
  getAirports: () => api.get('/flights/airports'),
  getFlightById: (id) => api.get(`/flights/${id}`),
};

export const reservationService = {
  createReservation: (data) => api.post('/reservations', data),
  getReservation: (id) => api.get(`/reservations/${id}`),
  getAllReservations: () => api.get('/reservations'),
};

export default api;
