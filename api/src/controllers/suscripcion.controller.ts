 import { Suscripcion } from '../models/suscripcion';
 import { 
    getSuscripciones, getSuscripcion, updateSuscripcion, deleteSuscripcion, addSuscripcion,
    getAll, getOneById, create, update, deleteOne 
} from '../services/suscripcion_service';

const connect_mongo = require('../database/connect_mongo');

connect_mongo();

export const obtener_suscripciones = async (req:any, res:any) => 
{
    const response = await getSuscripciones();

    if(!response.hubo_error) {
        const suscripciones = response.content;
        res.render('home', { suscripciones });
    }
    else {
        res.render('error');
    }
};

export const obtener_suscripcion_por_id = async (req:any, res:any) => {

    const id = Number(req.params.id); 

    const response = await getSuscripcion(id);

    if(!response.hubo_error) {
        const suscripcion = response.content;
        res.render('suscripcion', { suscripcion });
    }
    else {
        res.render('error');
    }
};

export const mostrar_view_crear = async (req:any, res:any) => {
    console.log('En view crear_suscripcion');
    res.render('crear_suscripcion');
};

export const crear_suscripcion = async (req:any, res:any) => {
    
    const { tipo, duracion_meses, porcentaje_plataforma } = req.body; 
    const suscripcionNueva = { tipo, duracion_meses, porcentaje_plataforma };

    const response = await addSuscripcion(suscripcionNueva);

    if(!response.hubo_error) {
        res.redirect('/api/suscripciones/');
    }
    else{
        res.render('error');
    } 
};

export const actualizar_suscripcion = async (req:any, res:any) => {
    const id = req.params.id; 
    const { tipo, duracion_meses, porcentaje_plataforma } = req.body; 
    const suscripcionModificar = new Suscripcion(id, tipo, duracion_meses, porcentaje_plataforma);

    const response = await updateSuscripcion(suscripcionModificar);

    if(!response.hubo_error) {
        res.redirect('/api/suscripciones');
    }
    else {
        res.render('error');
    }
};

export const eliminar_suscripcion = async (req:any, res:any) => {
    const id = Number(req.params.id); 

    const response = await deleteSuscripcion(id);

    if(!response.hubo_error) {
        res.redirect('/api/suscripciones');
    }
    else {
        res.render('error');
    }
};

/***** Mongo db *****/

export const obtenerTodas  = async (req:any, res:any) => {
    const response = await getAll();

    if(!response.hubo_error) {
        const suscripciones = response.content;
        res.status(200).send(suscripciones);
    }
    else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const obtenerPorId = async (req:any, res:any) => {
    const { id } = req.params;
    const response = await getOneById(id);

    if (!response.hubo_error) {
        const suscripcion = response.content;
        res.status(200).send(suscripcion);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const crearSuscripcion = async (req:any, res:any) => {
    const data = req.body;
    const response = await create(data);

    if (!response.hubo_error) {
        res.status(201).send(response.content);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const actualizarSuscripcion = async (req:any, res:any) => {
    const { id } = req.params;
    const data = req.body;
    const response = await update(id, data);

    if (!response.hubo_error) {
        res.status(200).send(response.content);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const eliminarSuscripcion = async (req:any, res:any) => {
    const { id } = req.params;
    const response = await deleteOne(id);

    if (!response.hubo_error) {
        res.status(200).send(response.msj_a_mostrar);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};


module.exports = {
    obtener_suscripciones,
    obtener_suscripcion_por_id,
    mostrar_view_crear,
    crear_suscripcion,
    actualizar_suscripcion,
    eliminar_suscripcion,
    obtenerTodas,
    obtenerPorId,
    crearSuscripcion,
    actualizarSuscripcion,
    eliminarSuscripcion
};