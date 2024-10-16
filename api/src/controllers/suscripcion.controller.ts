 import { Suscripcion } from '../models/suscripcion';
 import { getSuscripciones, getSuscripcion, updateSuscripcion, deleteSuscripcion, addSuscripcion } from '../services/suscripcion_service';

const connect_mongo = require('../database/connect_mongo');
const SuscripcionModel = require('../models/suscripcion.model');
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

export const obtener_mongo  = async (req:any, res:any) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const data = await SuscripcionModel.find();
        obj_response.msj_a_mostrar = "OK";
        obj_response.content = data;
        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió obteniendo las suscripciones.";
        res.status(500).json(obj_response);
    }
};

module.exports = {
    obtener_suscripciones,
    obtener_suscripcion_por_id,
    mostrar_view_crear,
    crear_suscripcion,
    actualizar_suscripcion,
    eliminar_suscripcion,
    obtener_mongo
};