const {Router} = require("express");
const suscripcionController = require('../controllers/suscripcion.controller');

const suscripcionesRoutes = Router();

suscripcionesRoutes.get('/suscripciones', suscripcionController.obtener_suscripciones);
suscripcionesRoutes.get('/suscripciones/:id', suscripcionController.obtener_suscripcion_por_id);
suscripcionesRoutes.get('/nuevaSuscripcion', suscripcionController.mostrar_view_crear);
suscripcionesRoutes.post('/nuevaSuscripcion', suscripcionController.crear_suscripcion);
suscripcionesRoutes.post('/suscripciones/modificar/:id', suscripcionController.actualizar_suscripcion);
suscripcionesRoutes.post('/suscripciones/eliminar/:id', suscripcionController.eliminar_suscripcion);

suscripcionesRoutes.get('/mongo', suscripcionController.obtener_mongo);

module.exports = suscripcionesRoutes;