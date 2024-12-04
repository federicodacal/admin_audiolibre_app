//import { Suscripcion, obtenerTodas, obtenerPorId, insertarSuscripcion, actualizarSuscripcion, eliminarSuscripcion } from '../models/suscripcion';
import { MongoClient } from 'mongodb';
import { getNextSequence } from '../utils/collection_sequence';
const SuscripcionModel = require('../models/suscripcion.model');

const uri = process.env.MONGODB_URI || ''; 
const client = new MongoClient(uri);
const dbName = 'audiolibredb';
const collectionName = 'suscripcionmodels';

/*
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
*/

/* 
MONGO DB
*/

export const getAll = async() => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const data = await SuscripcionModel.find();
        obj_response.msj_a_mostrar = "OK";
        obj_response.content = data;
        return obj_response;
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema obteniendo las suscripciones: " + error;
        return obj_response;
    }
}

export const getOneById = async (id:number) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const data = await SuscripcionModel.findOne({id});
        if (!data) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = `Suscripción ${id} no encontrada`;
        } else {
            obj_response.msj_a_mostrar = "OK";
            obj_response.content = data;
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema obteniendo la suscripción: " + error;
    }
    return obj_response;
};

export const create = async (suscripcion:any) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {

        suscripcion.id = await getNextSequence('suscripcion_id');
        
        console.log('suscripcion sequence id: ', suscripcion.id);
        console.log('suscripcion en service: ', suscripcion);

        const result = await SuscripcionModel.collection.insertOne({
            titulo: suscripcion.titulo,
            id: suscripcion.id,
            duracion_dias: suscripcion.duracion_dias,
            porcentaje_plataforma: suscripcion.porcentaje_plataforma,
            precio: suscripcion.precio,
            fecha_creacion: new Date(),
            fecha_modificacion: new Date(),
        });

        console.log('Suscripcion insertado:', result);
        obj_response.msj_a_mostrar = "Suscripcion creada con éxito";
        obj_response.content = result;
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema creando la suscripción: " + error;
    }
    return obj_response;
};

export const update = async (id:number, data:any) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        data.fecha_modificacion = new Date();
        console.log("Data en update:", data);

        const filter = { id: Number(id) };
        console.log("Filtro de búsqueda:", filter);

        const existingSuscripcion = await collection.findOne(filter);
        if (!existingSuscripcion) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Suscripcion no encontrada.";
            return obj_response;
        }

        console.log("Documento encontrado:", existingSuscripcion);

        delete data._id;

        const updateResult = await collection.updateOne(filter, { $set: data });
        console.log("Resultado de updateOne:", updateResult);

        if (updateResult.matchedCount === 0) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Suscripcion no encontrada.";
        } else if (updateResult.modifiedCount === 0) {
            obj_response.msj_a_mostrar = "Suscripcion encontrada, pero no se realizaron cambios.";
        } else {
            obj_response.msj_a_mostrar = "Suscripcion actualizada con éxito.";
            obj_response.content = await collection.findOne(filter) || {};
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema actualizando la suscripción: " + error;
    }
    return obj_response;
};

export const deleteOne = async (id:number) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const deletedSuscripcion = await SuscripcionModel.findOneAndDelete({id});
        if (!deletedSuscripcion) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Suscripción no encontrada";
        } else {
            obj_response.msj_a_mostrar = "Suscripción eliminada con éxito";
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema eliminando la suscripción: " + error;
    }
    return obj_response;
};

module.exports = {
    getAll,
    getOneById,
    create,
    update,
    deleteOne
}