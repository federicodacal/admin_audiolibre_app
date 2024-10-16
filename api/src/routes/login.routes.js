const {Router} = require("express");
const loginController = require('../controllers/login.controller');

const loginRoutes = Router();

loginRoutes.get('/login', loginController.mostrar_view_login);
loginRoutes.post('/login', loginController.login);

module.exports = loginRoutes;