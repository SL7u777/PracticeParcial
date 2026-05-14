const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ['M', 'F'], required: true },
  birthDate: { type: String, required: true },
  nationality: { type: String, default: 'Peru' },
  documentType: { type: String, default: 'DNI' },
  documentNumber: String,
});

const reservationSchema = new mongoose.Schema({
  reservationCode: { type: String, unique: true },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  returnFlight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  tripType: { type: String, enum: ['round', 'oneway'], default: 'round' },
  passengers: [passengerSchema],
  contact: {
    email: { type: String, required: true },
    phone: String,
  },
  selectedFare: { type: String, enum: ['light', 'classic', 'flex'], default: 'light' },
  returnFare: { type: String, enum: ['light', 'classic', 'flex'], default: 'light' },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'pending', 'cancelled'], default: 'confirmed' },
  createdAt: { type: Date, default: Date.now },
});

reservationSchema.pre('save', function (next) {
  if (!this.reservationCode) {
    this.reservationCode = 'RES' + Date.now().toString(36).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Reservation', reservationSchema);
