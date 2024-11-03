const {Router} = require("express");
const suscripcionController = require('../controllers/suscripcion.controller');
const { cookieJwtAuth } = require("../middlewares/jwt");

const suscripcionesApiRoutes = Router();

suscripcionesApiRoutes.get('/suscripciones', suscripcionController.obtenerTodas);
suscripcionesApiRoutes.get('/suscripciones/:id', suscripcionController.obtenerPorId);
suscripcionesApiRoutes.post('/suscripciones', suscripcionController.crearSuscripcion);
suscripcionesApiRoutes.put('/suscripciones/modificar/:id', suscripcionController.actualizarSuscripcion);
suscripcionesApiRoutes.delete('/suscripciones/eliminar/:id', suscripcionController.eliminarSuscripcion);

module.exports = suscripcionesApiRoutes;