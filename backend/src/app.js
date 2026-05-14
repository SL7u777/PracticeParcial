const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const flightRoutes = require('./routes/flights');
const reservationRoutes = require('./routes/reservations');

const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Airline Reservation API',
      version: '1.0.0',
      description: 'API para el sistema de reservación de vuelos',
    },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/flights', flightRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Airline Reservation API running', docs: '/api-docs' });
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/airline_db';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    const Flight = require('./models/Flight');
    const count = await Flight.countDocuments();
    if (count === 0) {
      const { seedFlights } = require('./seed/seedData');
      await seedFlights();
      console.log('Database seeded');
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
