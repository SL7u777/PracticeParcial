const mongoose = require('mongoose');

const fareSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  benefits: [String],
});

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  origin: {
    code: { type: String, required: true },
    city: { type: String, required: true },
    airport: String,
  },
  destination: {
    code: { type: String, required: true },
    city: { type: String, required: true },
    airport: String,
  },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  duration: { type: String, required: true },
  stops: { type: Number, default: 0 },
  stopCity: String,
  airline: { type: String, default: 'AeroReservas' },
  date: { type: String, required: true },
  fares: {
    light: fareSchema,
    classic: fareSchema,
    flex: fareSchema,
  },
  availableSeats: { type: Number, default: 50 },
});

module.exports = mongoose.model('Flight', flightSchema);
