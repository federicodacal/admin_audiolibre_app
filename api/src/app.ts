import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

require('dotenv').config();

const app = express();

const methodOverride = require('method-override');

const suscripcionRoutes = require('./routes/suscripcion.routes.js');
const loginRoutes = require('./routes/login.routes.js');

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

app.use('/', loginRoutes);
app.use('/api/', suscripcionRoutes);

app.use((req, res, next) => {
    res.status(404).render('error');
});

export default app;
