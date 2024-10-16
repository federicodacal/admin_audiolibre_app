 import { Suscripcion, obtenerTodas, obtenerPorId, insertarSuscripcion, actualizarSuscripcion, eliminarSuscripcion } from '../models/suscripcion';
 import { getSuscripciones, 
    getSuscripcion,
    updateSuscripcion,
    deleteSuscripcion } from '../services/suscripcion_service';

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

export const crear_suscripcion = async (req:any, res:any) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const { tipo, duracion_meses, porcentaje_plataforma } = req.body;
        const nuevaSuscripcion = new Suscripcion(0, tipo, duracion_meses, porcentaje_plataforma); 
        const id = await insertarSuscripcion(nuevaSuscripcion);
        obj_response.msj_a_mostrar = `Suscripción creada con éxito con ID: ${id}.`;
        obj_response.content = { id };
        res.status(201).json(obj_response);
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema creando la suscripción.";
        res.status(500).json(obj_response);
    }
};

export const actualizar_suscripcion = async (req:any, res:any) => {
    const id = req.params.id; 
    const { tipo, duracion_meses, porcentaje_plataforma } = req.body; 
    const suscripcionModificar = new Suscripcion(id, tipo, duracion_meses, porcentaje_plataforma);

    console.log("estoy en update");
    console.log("ID:"+id);
    console.log(suscripcionModificar.toString());

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
    crear_suscripcion,
    actualizar_suscripcion,
    eliminar_suscripcion,
    obtener_mongo
};