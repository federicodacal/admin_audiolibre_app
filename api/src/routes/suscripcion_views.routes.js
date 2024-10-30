const {Router} = require("express");
const suscripcionController = require('../controllers/suscripcion.controller');
const { cookieJwtAuth } = require("../middlewares/jwt");

const suscripcionesViewsRoutes = Router();

suscripcionesViewsRoutes.get('/suscripciones', cookieJwtAuth, suscripcionController.obtener_suscripciones);
suscripcionesViewsRoutes.get('/suscripciones/:id', cookieJwtAuth, suscripcionController.obtener_suscripcion_por_id);
suscripcionesViewsRoutes.get('/nuevaSuscripcion', cookieJwtAuth, suscripcionController.mostrar_view_crear);
suscripcionesViewsRoutes.post('/nuevaSuscripcion', cookieJwtAuth, suscripcionController.crear_suscripcion);
suscripcionesViewsRoutes.put('/suscripciones/modificar/:id', cookieJwtAuth, suscripcionController.actualizar_suscripcion);
suscripcionesViewsRoutes.delete('/suscripciones/eliminar/:id', cookieJwtAuth, suscripcionController.eliminar_suscripcion);

module.exports = suscripcionesViewsRoutes;