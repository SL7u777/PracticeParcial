const Flight = require('../models/Flight');

const AIRPORTS = [
  { code: 'LIM', city: 'Lima', airport: 'Aeropuerto Internacional Jorge Chávez', country: 'Perú' },
  { code: 'MIA', city: 'Miami', airport: 'Miami International Airport', country: 'USA' },
  { code: 'BOG', city: 'Bogotá', airport: 'Aeropuerto El Dorado', country: 'Colombia' },
  { code: 'GRU', city: 'São Paulo', airport: 'Aeropuerto Internacional Guarulhos', country: 'Brasil' },
  { code: 'SCL', city: 'Santiago', airport: 'Aeropuerto Internacional Arturo Merino', country: 'Chile' },
  { code: 'MEX', city: 'Ciudad de México', airport: 'Aeropuerto Internacional Benito Juárez', country: 'México' },
  { code: 'MAD', city: 'Madrid', airport: 'Aeropuerto Internacional Barajas', country: 'España' },
  { code: 'JFK', city: 'New York', airport: 'John F. Kennedy International Airport', country: 'USA' },
  { code: 'CUN', city: 'Cancún', airport: 'Aeropuerto Internacional de Cancún', country: 'México' },
  { code: 'PTY', city: 'Ciudad de Panamá', airport: 'Aeropuerto Internacional Tocumen', country: 'Panamá' },
];

exports.getAirports = (req, res) => {
  res.json(AIRPORTS);
};

exports.searchFlights = async (req, res) => {
  try {
    const { origin, destination, date, returnDate, tripType = 'round', passengers = 1 } = req.query;

    if (!origin || !destination || !date) {
      return res.status(400).json({ error: 'origin, destination y date son requeridos' });
    }

    const outboundFlights = await Flight.find({
      'origin.code': origin.toUpperCase(),
      'destination.code': destination.toUpperCase(),
      date: date,
      availableSeats: { $gte: parseInt(passengers) },
    });

    const result = { outbound: outboundFlights, return: [] };

    if (tripType === 'round' && returnDate) {
      const returnFlights = await Flight.find({
        'origin.code': destination.toUpperCase(),
        'destination.code': origin.toUpperCase(),
        date: returnDate,
        availableSeats: { $gte: parseInt(passengers) },
      });
      result.return = returnFlights;
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ error: 'Vuelo no encontrado' });
    res.json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
