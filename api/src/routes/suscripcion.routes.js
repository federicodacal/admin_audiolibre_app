const {Router} = require("express");
const suscripcionController = require('../controllers/suscripcion.controller');

const suscripcionesRoutes = Router();

suscripcionesRoutes.get('/suscripciones', suscripcionController.obtener_suscripciones);
suscripcionesRoutes.get('/suscripciones/:id', suscripcionController.obtener_suscripcion_por_id);
suscripcionesRoutes.post('/suscripciones', suscripcionController.crear_suscripcion);
suscripcionesRoutes.put('/suscripciones', suscripcionController.actualizar_suscripcion);
suscripcionesRoutes.delete('/suscripciones', suscripcionController.eliminar_suscripcion);

module.exports = suscripcionesRoutes;