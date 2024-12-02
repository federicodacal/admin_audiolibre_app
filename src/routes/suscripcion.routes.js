const {Router} = require("express");
const suscripcionController = require('../controllers/suscripcion.controller');
const { cookieJwtAuth } = require("../middlewares/jwt");
/*
const suscripcionesRoutes = Router();

suscripcionesRoutes.get('/suscripciones', cookieJwtAuth, suscripcionController.obtener_suscripciones);
suscripcionesRoutes.get('/suscripciones/:id', cookieJwtAuth, suscripcionController.obtener_suscripcion_por_id);
suscripcionesRoutes.get('/nuevaSuscripcion', cookieJwtAuth, suscripcionController.mostrar_view_crear);
suscripcionesRoutes.post('/nuevaSuscripcion', cookieJwtAuth, suscripcionController.crear_suscripcion);
suscripcionesRoutes.put('/suscripciones/modificar/:id', cookieJwtAuth, suscripcionController.actualizar_suscripcion);
suscripcionesRoutes.delete('/suscripciones/eliminar/:id', cookieJwtAuth, suscripcionController.eliminar_suscripcion);

module.exports = suscripcionesRoutes;
*/