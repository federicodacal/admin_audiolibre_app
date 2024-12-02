const {Router} = require("express");
const generoController = require('../controllers/genero.controller');
const { cookieJwtAuth } = require("../middlewares/jwt");

const generosApiRoutes = Router();

generosApiRoutes.get('/generos', generoController.obtenerTodos);
generosApiRoutes.get('/generos/:id', generoController.obtenerPorId);
generosApiRoutes.post('/generos', generoController.crearGenero);
generosApiRoutes.put('/generos/modificar/:id', generoController.actualizarGenero);
generosApiRoutes.delete('/generos/eliminar/:id', generoController.eliminarGenero);

module.exports = generosApiRoutes;