const {Router} = require("express");
const moderadorController = require('../controllers/moderadores.controller');
const { cookieJwtAuth } = require("../middlewares/jwt");

const moderadoresApiRoutes = Router();

moderadoresApiRoutes.get('/moderadores', moderadorController.obtenerTodos);
moderadoresApiRoutes.get('/moderadores/:id', moderadorController.obtenerPorId);
moderadoresApiRoutes.post('/moderadores', moderadorController.crearModerador);
moderadoresApiRoutes.put('/moderadores/modificar/:id', moderadorController.actualizarModerador);
moderadoresApiRoutes.delete('/moderadores/eliminar/:id', moderadorController.eliminarModerador);

module.exports = moderadoresApiRoutes;