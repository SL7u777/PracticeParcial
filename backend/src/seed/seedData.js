const mongoose = require('mongoose');
const Flight = require('../models/Flight');
require('dotenv').config();

const flights = [
  {
    flightNumber: 'AR001',
    origin: { code: 'LIM', city: 'Lima', airport: 'Jorge Chávez' },
    destination: { code: 'MIA', city: 'Miami', airport: 'Miami International' },
    departureTime: '01:40',
    arrivalTime: '12:25',
    duration: '9h 45m',
    stops: 1,
    stopCity: 'BOG',
    airline: 'AeroReservas',
    date: '2026-06-05',
    fares: {
      light: { price: 313.77, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Acumula 2 millas por USD'] },
      classic: { price: 351.92, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Equipaje de bodega 23kg', 'Check-in en aeropuerto', 'Acumula 6 millas por USD'] },
      flex: { price: 438.02, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Equipaje de bodega 23kg', 'Selección de asiento Plus', 'Acumula 6 millas por USD', 'Cambios antes del vuelo', 'Reembolsos antes del vuelo'] },
    },
    availableSeats: 45,
  },
  {
    flightNumber: 'AR002',
    origin: { code: 'LIM', city: 'Lima', airport: 'Jorge Chávez' },
    destination: { code: 'MIA', city: 'Miami', airport: 'Miami International' },
    departureTime: '02:50',
    arrivalTime: '12:25',
    duration: '8h 35m',
    stops: 1,
    stopCity: 'BOG',
    airline: 'AeroReservas',
    date: '2026-06-05',
    fares: {
      light: { price: 313.77, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Acumula 2 millas por USD'] },
      classic: { price: 351.92, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Equipaje de bodega 23kg', 'Check-in en aeropuerto', 'Acumula 6 millas por USD'] },
      flex: { price: 438.02, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Equipaje de bodega 23kg', 'Selección de asiento Plus', 'Acumula 6 millas por USD', 'Cambios antes del vuelo', 'Reembolsos antes del vuelo'] },
    },
    availableSeats: 30,
  },
  {
    flightNumber: 'AR010',
    origin: { code: 'MIA', city: 'Miami', airport: 'Miami International' },
    destination: { code: 'LIM', city: 'Lima', airport: 'Jorge Chávez' },
    departureTime: '02:45',
    arrivalTime: '10:35',
    duration: '8h 50m',
    stops: 1,
    stopCity: 'BOG',
    airline: 'AeroReservas',
    date: '2026-06-08',
    fares: {
      light: { price: 290.40, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Acumula 2 millas por USD'] },
      classic: { price: 331.70, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Equipaje de bodega 23kg', 'Check-in en aeropuerto', 'Acumula 6 millas por USD'] },
      flex: { price: 424.90, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Equipaje de bodega 23kg', 'Selección de asiento Plus', 'Acumula 6 millas por USD', 'Cambios antes del vuelo', 'Reembolsos antes del vuelo'] },
    },
    availableSeats: 50,
  },
  {
    flightNumber: 'AR011',
    origin: { code: 'MIA', city: 'Miami', airport: 'Miami International' },
    destination: { code: 'LIM', city: 'Lima', airport: 'Jorge Chávez' },
    departureTime: '08:15',
    arrivalTime: '16:30',
    duration: '9h 15m',
    stops: 1,
    stopCity: 'PTY',
    airline: 'AeroReservas',
    date: '2026-06-08',
    fares: {
      light: { price: 290.40, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Acumula 2 millas por USD'] },
      classic: { price: 331.70, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Equipaje de bodega 23kg', 'Check-in en aeropuerto', 'Acumula 6 millas por USD'] },
      flex: { price: 424.90, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Equipaje de bodega 23kg', 'Selección de asiento Plus', 'Acumula 6 millas por USD', 'Cambios antes del vuelo', 'Reembolsos antes del vuelo'] },
    },
    availableSeats: 40,
  },
  {
    flightNumber: 'AR003',
    origin: { code: 'LIM', city: 'Lima', airport: 'Jorge Chávez' },
    destination: { code: 'BOG', city: 'Bogotá', airport: 'El Dorado' },
    departureTime: '07:00',
    arrivalTime: '10:30',
    duration: '3h 30m',
    stops: 0,
    airline: 'AeroReservas',
    date: '2026-06-05',
    fares: {
      light: { price: 180.00, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg'] },
      classic: { price: 220.00, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Equipaje de bodega 23kg'] },
      flex: { price: 290.00, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Equipaje de bodega 23kg', 'Cambios y reembolsos'] },
    },
    availableSeats: 60,
  },
  {
    flightNumber: 'AR004',
    origin: { code: 'LIM', city: 'Lima', airport: 'Jorge Chávez' },
    destination: { code: 'SCL', city: 'Santiago', airport: 'Arturo Merino' },
    departureTime: '14:00',
    arrivalTime: '17:45',
    duration: '3h 45m',
    stops: 0,
    airline: 'AeroReservas',
    date: '2026-06-05',
    fares: {
      light: { price: 195.00, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg'] },
      classic: { price: 240.00, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Equipaje de bodega 23kg'] },
      flex: { price: 310.00, available: true, benefits: ['1 artículo personal', 'Equipaje de mano 10kg', 'Equipaje de bodega 23kg', 'Cambios y reembolsos'] },
    },
    availableSeats: 35,
  },
];

async function seedFlights() {
  await Flight.deleteMany({});
  await Flight.insertMany(flights);
  console.log('Flights seeded successfully');
}

if (require.main === module) {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/airline_db';
  mongoose.connect(MONGODB_URI).then(async () => {
    await seedFlights();
    await mongoose.disconnect();
    process.exit(0);
  });
}

module.exports = { seedFlights };
