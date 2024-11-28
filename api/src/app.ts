import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

require('dotenv').config();

const app = express();
const methodOverride = require('method-override');
const Grid = require("gridfs-stream");
const { createStorage } = require('./middlewares/upload');

const loginRoutes = require('./routes/login.routes.js');
const suscripcionRoutes = require('./routes/suscripcion.routes.js');
const suscripcionApiRoutes = require('./routes/suscripcion_api.routes.js');
const carrouselApiRoutes = require('./routes/carrousel.routes.js');
const moderadoresApiRoutes = require('./routes/moderador.routes.js');

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());

/* Template engine */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Conexión mongodb */
const connect_mongo = require('./database/connect_mongo');
let gfs;
connect_mongo().then(() => {
    const conn = mongoose.connection;
    gfs = Grid(conn.db, mongoose.mongo);

    const upload = createStorage(conn); // Crea el middleware de carga

    // Rutas
    app.use('/', loginRoutes);
    app.use('/', suscripcionRoutes);
    app.use('/api/', suscripcionApiRoutes);
    app.use('/api/', moderadoresApiRoutes);
    app.use('/api/', carrouselApiRoutes(upload)); // Pasa upload a las rutas
    app.use((req, res, next) => {
        res.status(404).render('error');
    });
});


export default app;
