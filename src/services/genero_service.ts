import { MongoClient } from 'mongodb';
import { getNextSequence } from '../utils/collection_sequence';
const GeneroModel = require('../models/genero.model');

const uri = process.env.MONGODB_URI || ''; 
const client = new MongoClient(uri);
const dbName = 'audiolibredb';
const collectionName = 'generomodels';

export const getAll = async() => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const data = await GeneroModel.find();
        obj_response.msj_a_mostrar = "OK";
        obj_response.content = data;
        return obj_response;
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema obteniendo los generos: " + error;
        return obj_response;
    }
}

export const getOneById = async (id:number) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const data = await GeneroModel.findOne({id});
        if (!data) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = `Genero ${id} no encontrado`;
        } else {
            obj_response.msj_a_mostrar = "OK";
            obj_response.content = data;
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema obteniendo el genero: " + error;
    }
    return obj_response;
};

export const create = async (genero:any) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {

        genero.id = await getNextSequence('genero_id');

        const result = await GeneroModel.collection.insertOne({
            id: genero.id,
            nombre: genero.nombre,
            fecha_creacion: new Date(),
            fecha_modificacion: new Date(),
        });

        console.log('Genero insertado:', result);
        obj_response.msj_a_mostrar = "Genero creado con éxito";
        obj_response.content = result;
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema creando el genero: " + error;
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
        console.log('Data en update: ', data);

        const filter = { id:Number(id) };

        const existingGenero = await collection.findOne(filter);
        if(!existingGenero) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Genero no encontrado.";
            return obj_response;
        }

        console.log("Documento encontrado:", existingGenero);

        delete data._id;

        const updateResult = await collection.updateOne(filter, { $set: data });
        console.log("Resultado de updateOne:", updateResult);

        if (updateResult.matchedCount === 0) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Genero no encontrado.";
        } else if (updateResult.modifiedCount === 0) {
            obj_response.msj_a_mostrar = "Genero encontrado, pero no se realizaron cambios.";
        } else {
            obj_response.msj_a_mostrar = "Genero actualizado con éxito.";
            obj_response.content = await collection.findOne(filter) || {};
        }

    } catch (error:any) {
        console.error("Error al actualizar carrousel:", error.message);
        console.error("Stack trace:", error.stack);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema actualizando carrousel: " + error.message;
    } finally {
        await client.close();
    }

    return obj_response;
};

export const deleteOne = async (id:number) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const deletedGenero = await GeneroModel.findOneAndDelete({id});
        if (!deletedGenero) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Genero no encontrado";
        } else {
            obj_response.msj_a_mostrar = "Genero eliminado con éxito";
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema eliminando la categoría: " + error;
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