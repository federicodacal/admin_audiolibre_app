const {Router} = require("express");
const carrouselController = require('../controllers/carrousel.controller');
const { cookieJwtAuth } = require("../middlewares/jwt");

const carrouselApiRoutes = (upload) => {
    const router = Router();

    router.get('/carrousel', carrouselController.obtenerTodas);
    router.get('/carrousel/:id', carrouselController.obtenerPorId);
    router.post('/carrousel', upload.single("img"), carrouselController.crearCarrousel);
    router.put('/carrousel/modificar/:id', carrouselController.actualizarCarrousel);
    router.delete('/carrousel/eliminar/:id', carrouselController.eliminarCarrousel);

    return router;
};

module.exports = carrouselApiRoutes;