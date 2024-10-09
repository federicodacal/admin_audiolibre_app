import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

require('dotenv').config();

const app = express();

const suscripcionRoutes = require('./routes/suscripcion.routes.js');

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/', suscripcionRoutes);

export default app;
