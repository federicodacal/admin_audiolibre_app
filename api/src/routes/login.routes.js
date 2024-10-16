const {Router} = require("express");
const loginController = require('../controllers/auth.controller');

const loginRoutes = Router();

loginRoutes.post('/login', loginController.ingresar);

module.exports = loginRoutes;