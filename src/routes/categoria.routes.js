const {Router} = require("express");
const categoriaController = require('../controllers/categoria.controller');
const { cookieJwtAuth } = require("../middlewares/jwt");

const categoriasApiRoutes = Router();

categoriasApiRoutes.get('/categorias', categoriaController.obtenerTodas);
categoriasApiRoutes.get('/categorias/:id', categoriaController.obtenerPorId);
categoriasApiRoutes.post('/categorias', categoriaController.crearCategoria);
categoriasApiRoutes.put('/categorias/modificar/:id', categoriaController.actualizarCategoria);
categoriasApiRoutes.delete('/categorias/eliminar/:id', categoriaController.eliminarCategoria);

module.exports = categoriasApiRoutes;