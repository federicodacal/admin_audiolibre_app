import { obtenerTodas, obtenerPorId, insertarSuscripcion, actualizarSuscripcion, eliminarSuscripcion } from '../services/db_local_service'; 
import { Suscripcion } from '../models/suscripcion';  

export const obtener_suscripciones = async (req:any, res:any) => 
{
    let obj_response = {hubo_error: false, msj_a_mostrar:"" ,content: {}}
    
    try {
        const suscripciones = await obtenerTodas();
        obj_response.msj_a_mostrar = "Suscripciones obtenidas.";
        obj_response.content = suscripciones;
        res.status(200).json(obj_response);
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema obteniendo las suscripciones.";
        res.status(500).json(obj_response);
    }
};

export const obtener_suscripcion_por_id = async (req:any, res:any) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const id = Number(req.params.id); 
        const suscripcion = await obtenerPorId(id);
        if (suscripcion) {
            obj_response.msj_a_mostrar = "Suscripción obtenida.";
            obj_response.content = suscripcion;
            res.status(200).json(obj_response);
        } else {
            obj_response.msj_a_mostrar = "Suscripción no encontrada.";
            res.status(404).json(obj_response);
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema obteniendo la suscripción.";
        res.status(500).json(obj_response);
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
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const { id, tipo, duracion_meses, porcentaje_plataforma } = req.body;  
        const suscripcionActualizada = new Suscripcion(id, tipo, duracion_meses, porcentaje_plataforma);
        const filasAfectadas = await actualizarSuscripcion(suscripcionActualizada);
        if (filasAfectadas > 0) {
            obj_response.msj_a_mostrar = "Suscripción actualizada con éxito.";
            res.status(200).json(obj_response);
        } else {
            obj_response.msj_a_mostrar = "Suscripción no encontrada.";
            res.status(404).json(obj_response);
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema actualizando la suscripción.";
        res.status(500).json(obj_response);
    }
};

export const eliminar_suscripcion = async (req:any, res:any) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const { id } = req.body; 
        const filasAfectadas = await eliminarSuscripcion(id);
        if (filasAfectadas > 0) {
            obj_response.msj_a_mostrar = "Suscripción eliminada con éxito.";
            res.status(200).json(obj_response);
        } else {
            obj_response.msj_a_mostrar = "Suscripción no encontrada.";
            res.status(404).json(obj_response);
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema eliminando la suscripción.";
        res.status(500).json(obj_response);
    }
};

module.exports = {
    obtener_suscripciones,
    obtener_suscripcion_por_id,
    crear_suscripcion,
    actualizar_suscripcion,
    eliminar_suscripcion
};