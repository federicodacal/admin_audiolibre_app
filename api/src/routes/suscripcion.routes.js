const {Router} = require("express");
const suscripcionController = require('../controllers/suscripcion.controller');

const suscripcionesRoutes = Router();

suscripcionesRoutes.get('/', suscripcionController.obtener_suscripciones);

module.exports = suscripcionesRoutes;