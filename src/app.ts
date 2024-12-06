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
//const suscripcionRoutes = require('./routes/suscripcion.routes.js');
const suscripcionApiRoutes = require('./routes/suscripcion_api.routes.js');
const carrouselApiRoutes = require('./routes/carrousel.routes.js');
const moderadoresApiRoutes = require('./routes/moderador.routes.js');
const categoriasApiRoutes = require('./routes/categoria.routes.js');
const generosApiRoutes = require('./routes/genero.routes.js');

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://react-audiolibre-vercel.vercel.app'],
    credentials: true, 
}));
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

app.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        console.warn('MongoDB no está conectado.');
        return res.status(503).send('Servicio no disponible: Problema con la base de datos.');
    }
    next(); 
});

connect_mongo().then(() => {
    const conn = mongoose.connection;

    conn.once('open', () => {
        console.log('Conexión a MongoDB abierta');
        gfs = Grid(conn.db, mongoose.mongo);
    });

    const upload = createStorage(conn); // Crea el middleware de carga
    
    // Rutas
    app.use('/', loginRoutes);
    app.use('/api/', suscripcionApiRoutes);
    app.use('/api/', moderadoresApiRoutes);
    app.use('/api/', categoriasApiRoutes);
    app.use('/api/', carrouselApiRoutes(upload)); // Pasa upload a las rutas
    app.use('/api/', generosApiRoutes);
    app.use((req, res, next) => {
        res.status(404).send('Ruta no encontrada');
    });
}).catch((err:any) => {
    console.error("Error de conexión a MongoDB:", err);
    process.exit(1);
});


export default app;
