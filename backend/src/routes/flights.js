const express = require('express');
const router = express.Router();
const { searchFlights, getFlightById, getAirports } = require('../controllers/flightController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Fare:
 *       type: object
 *       properties:
 *         price:
 *           type: number
 *         available:
 *           type: boolean
 *         benefits:
 *           type: array
 *           items:
 *             type: string
 *     Flight:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         flightNumber:
 *           type: string
 *         origin:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *             city:
 *               type: string
 *         destination:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *             city:
 *               type: string
 *         departureTime:
 *           type: string
 *         arrivalTime:
 *           type: string
 *         duration:
 *           type: string
 *         stops:
 *           type: number
 *         date:
 *           type: string
 *         fares:
 *           type: object
 *           properties:
 *             light:
 *               $ref: '#/components/schemas/Fare'
 *             classic:
 *               $ref: '#/components/schemas/Fare'
 *             flex:
 *               $ref: '#/components/schemas/Fare'
 */

/**
 * @swagger
 * /api/flights/search:
 *   get:
 *     summary: Buscar vuelos disponibles
 *     tags: [Flights]
 *     parameters:
 *       - in: query
 *         name: origin
 *         required: true
 *         schema:
 *           type: string
 *         description: Código IATA del aeropuerto de origen (ej. LIM)
 *       - in: query
 *         name: destination
 *         required: true
 *         schema:
 *           type: string
 *         description: Código IATA del aeropuerto de destino (ej. MIA)
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: Fecha de salida (YYYY-MM-DD)
 *       - in: query
 *         name: tripType
 *         schema:
 *           type: string
 *           enum: [round, oneway]
 *         description: Tipo de viaje
 *       - in: query
 *         name: passengers
 *         schema:
 *           type: integer
 *         description: Número de pasajeros
 *     responses:
 *       200:
 *         description: Lista de vuelos disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 outbound:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Flight'
 *                 return:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Flight'
 *       400:
 *         description: Parámetros inválidos
 */
router.get('/search', searchFlights);

/**
 * @swagger
 * /api/flights/airports:
 *   get:
 *     summary: Obtener lista de aeropuertos disponibles
 *     tags: [Flights]
 *     responses:
 *       200:
 *         description: Lista de aeropuertos
 */
router.get('/airports', getAirports);

/**
 * @swagger
 * /api/flights/{id}:
 *   get:
 *     summary: Obtener vuelo por ID
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del vuelo
 *       404:
 *         description: Vuelo no encontrado
 */
router.get('/:id', getFlightById);

module.exports = router;
