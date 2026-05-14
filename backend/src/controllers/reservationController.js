const Reservation = require('../models/Reservation');
const Flight = require('../models/Flight');

exports.createReservation = async (req, res) => {
  try {
    const { flight, returnFlight, tripType, passengers, contact, selectedFare, returnFare, totalPrice } = req.body;

    if (!flight || !passengers || !contact || !selectedFare || !totalPrice) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const flightDoc = await Flight.findById(flight);
    if (!flightDoc) return res.status(404).json({ error: 'Vuelo no encontrado' });

    if (flightDoc.availableSeats < passengers.length) {
      return res.status(400).json({ error: 'No hay suficientes asientos disponibles' });
    }

    const reservation = new Reservation({
      flight,
      returnFlight: returnFlight || null,
      tripType: tripType || 'round',
      passengers,
      contact,
      selectedFare,
      returnFare: returnFare || selectedFare,
      totalPrice,
    });

    await reservation.save();

    flightDoc.availableSeats -= passengers.length;
    await flightDoc.save();

    if (returnFlight) {
      const returnFlightDoc = await Flight.findById(returnFlight);
      if (returnFlightDoc) {
        returnFlightDoc.availableSeats -= passengers.length;
        await returnFlightDoc.save();
      }
    }

    await reservation.populate('flight');
    if (reservation.returnFlight) await reservation.populate('returnFlight');

    res.status(201).json({ message: 'Reservación creada exitosamente', reservation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReservation = async (req, res) => {
  try {
    let reservation;
    if (req.params.id.startsWith('RES')) {
      reservation = await Reservation.findOne({ reservationCode: req.params.id })
        .populate('flight')
        .populate('returnFlight');
    } else {
      reservation = await Reservation.findById(req.params.id)
        .populate('flight')
        .populate('returnFlight');
    }
    if (!reservation) return res.status(404).json({ error: 'Reservación no encontrada' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('flight')
      .populate('returnFlight')
      .sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
