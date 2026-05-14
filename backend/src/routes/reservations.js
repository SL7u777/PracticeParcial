const express = require('express');
const router = express.Router();
const { createReservation, getReservation, getAllReservations } = require('../controllers/reservationController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Passenger:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - gender
 *         - birthDate
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [M, F]
 *         birthDate:
 *           type: string
 *     Reservation:
 *       type: object
 *       required:
 *         - flight
 *         - passengers
 *         - contact
 *         - selectedFare
 *         - totalPrice
 *       properties:
 *         flight:
 *           type: string
 *           description: ID del vuelo
 *         returnFlight:
 *           type: string
 *           description: ID del vuelo de vuelta (opcional)
 *         tripType:
 *           type: string
 *           enum: [round, oneway]
 *         passengers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Passenger'
 *         contact:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *         selectedFare:
 *           type: string
 *           enum: [light, classic, flex]
 *         returnFare:
 *           type: string
 *           enum: [light, classic, flex]
 *         totalPrice:
 *           type: number
 */

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Crear una nueva reservación de vuelo
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Reservación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reservation:
 *                   $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', createReservation);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Obtener todas las reservaciones
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Lista de reservaciones
 */
router.get('/', getAllReservations);

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Obtener una reservación por código
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Código de reservación o ID
 *     responses:
 *       200:
 *         description: Datos de la reservación
 *       404:
 *         description: Reservación no encontrada
 */
router.get('/:id', getReservation);

module.exports = router;
