import { Suscripcion, obtenerTodas, obtenerPorId, insertarSuscripcion, actualizarSuscripcion, eliminarSuscripcion } from '../models/suscripcion';

export const getSuscripciones = async() => {

    let obj_response = {hubo_error: false, msj_a_mostrar:"" ,content: {}}

    try {
        const suscripciones = await obtenerTodas();
        obj_response.msj_a_mostrar = "Suscripciones obtenidas.";
        obj_response.content = suscripciones;
        return obj_response;
    }
    catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema obteniendo las suscripciones: " + error;
        return obj_response;
    }
}

export const getSuscripcion = async (id:number) => {

    let obj_response = {hubo_error: false, msj_a_mostrar:"" ,content: {}}

    try {
        const suscripcion = await obtenerPorId(id);

        if(suscripcion) {
            obj_response.msj_a_mostrar = `Suscripcion ${id} obtenida.`;
            obj_response.content = suscripcion;
        }
        else {
            obj_response.msj_a_mostrar = `No se encontró la suscripción con id ${id}.`;
        }
        return obj_response;
    }
    catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = `Ocurrió un problema obteniendo la suscripción ${id}: ${error}`;
        return obj_response;
    }
}

export const addSuscripcion = async (suscripcion:any) => {

    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const id = await insertarSuscripcion(suscripcion);
        obj_response.msj_a_mostrar = `Suscripción creada con éxito con ID: ${id}.`;
        obj_response.content = { id };
        return obj_response;
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = `Ocurrió un problema insertando la suscripción ${suscripcion.id}: ${error}`;
        return obj_response;
    }
}

export const updateSuscripcion = async (suscripcion:Suscripcion) => {

    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const filasAfectadas = await actualizarSuscripcion(suscripcion);
        if (filasAfectadas > 0) {
            obj_response.msj_a_mostrar = "Suscripción actualizada con éxito.";
        } else {
            obj_response.msj_a_mostrar = `Suscripción ${suscripcion.id} no encontrada.`;
        }
        return obj_response;
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = `Ocurrió un problema actualizando la suscripción ${suscripcion.id}: ${error}`;
        return obj_response;
    }
}

export const deleteSuscripcion = async(id:number) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const filasAfectadas = await eliminarSuscripcion(id);
        if (filasAfectadas > 0) {
            obj_response.msj_a_mostrar = "Suscripción eliminada con éxito.";
        } else {
            obj_response.msj_a_mostrar = `Suscripción ${id} no encontrada.`;
        }
        return obj_response;
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = `Ocurrió un problema eliminando la suscripción ${id}: ${error}`;
        return obj_response;
    }
}

module.exports = {
    getSuscripciones, 
    getSuscripcion,
    addSuscripcion,
    updateSuscripcion,
    deleteSuscripcion
}