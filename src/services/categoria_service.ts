import { MongoClient } from 'mongodb';
import { getNextSequence } from '../utils/collection_sequence';
const CategoriaModel = require('../models/categoria.model');

const uri = process.env.MONGODB_URI || ''; 
const client = new MongoClient(uri);
const dbName = 'audiolibredb';
const collectionName = 'categoriamodels';

export const getAll = async() => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const data = await CategoriaModel.find();
        obj_response.msj_a_mostrar = "OK";
        obj_response.content = data;
        return obj_response;
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema obteniendo las categorias: " + error;
        return obj_response;
    }
}

export const getOneById = async (id:number) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const data = await CategoriaModel.findOne({id});
        if (!data) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = `Categoria ${id} no encontrada`;
        } else {
            obj_response.msj_a_mostrar = "OK";
            obj_response.content = data;
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema obteniendo la categoría: " + error;
    }
    return obj_response;
};

export const create = async (categoria:any) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {

        categoria.id = await getNextSequence('categoria_id');

        const result = await CategoriaModel.collection.insertOne({
            id: categoria.id,
            nombre: categoria.nombre,
            fecha_creacion: new Date(),
            fecha_modificacion: new Date(),
        });

        console.log('Categoria insertada:', result);
        obj_response.msj_a_mostrar = "Categoria creado con éxito";
        obj_response.content = result;
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema creando la categoria: " + error;
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

        const existingCategoria = await collection.findOne(filter);
        if(!existingCategoria) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Categoria no encontrado.";
            return obj_response;
        }

        console.log("Documento encontrado:", existingCategoria);

        delete data._id;

        const updateResult = await collection.updateOne(filter, { $set: data });
        console.log("Resultado de updateOne:", updateResult);

        if (updateResult.matchedCount === 0) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Categoria no encontrado.";
        } else if (updateResult.modifiedCount === 0) {
            obj_response.msj_a_mostrar = "Categoria encontrado, pero no se realizaron cambios.";
        } else {
            obj_response.msj_a_mostrar = "Categoria actualizado con éxito.";
            obj_response.content = await collection.findOne(filter) || {};
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema actualizando la categoría: " + error;
    }
    return obj_response;
};

export const deleteOne = async (id:number) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const deletedCategoria = await CategoriaModel.findOneAndDelete({id});
        if (!deletedCategoria) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Categoria no encontrada";
        } else {
            obj_response.msj_a_mostrar = "Categoria eliminada con éxito";
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