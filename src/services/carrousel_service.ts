import { MongoClient, ObjectId } from 'mongodb';
import { getNextSequence } from '../utils/collection_sequence';
const CarrouselModel = require('../models/carrousel.model');

const uri = process.env.MONGODB_URI || ''; 
const client = new MongoClient(uri);
const dbName = 'audiolibredb';
const collectionName = 'carrouselmodels';

const URL = {
    DEV : 'http://localhost:5000/api',
    PROD : 'https://admin-audiolibre-api.vercel.app/api' 
}

export const getAll = async() => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const data = await CarrouselModel.find();
        obj_response.content = data.map((item:any) => ({
            ...item.toObject(),
            imgUrl: `${URL.DEV}/carrousel/imagen/${item.file_id}`
        }));
        obj_response.msj_a_mostrar = "OK";
        return obj_response;
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema obteniendo el carrousel: " + error;
        return obj_response;
    }
}

export const getOneById = async (id:number) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const data = await CarrouselModel.findOne({id});
        if (!data) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = `Carrousel ${id} no encontrada`;
        } else {
            obj_response.msj_a_mostrar = "OK";
            obj_response.content = {
                ...data.toObject(),
                imgUrl: `${URL.DEV}/carrousel/imagen/${data.file_id}`
            };
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema obteniendo el carrousel: " + error;
    }
    return obj_response;
};

export const create = async (carrousel:any) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    console.log('Entré al service');

    try {

        carrousel.id = await getNextSequence('carrousel_id');
        
        console.log('Carrousel sequence id: ', carrousel.id);
        console.log('Carrousel en service: ', carrousel);

        if (!carrousel.file_id) {
            throw new Error('El archivo no fue subido correctamente');
        }

        console.log('Carrousel en service antes de guardar: ', carrousel);

        const result = await CarrouselModel.collection.insertOne({
            titulo: carrousel.titulo,
            id: carrousel.id,
            descripcion: carrousel.descripcion,
            file_id: carrousel.file_id,
            fecha_creacion: new Date(),
            fecha_modificacion: new Date(),
        });

        console.log('Carrousel insertado:', result);
        obj_response.msj_a_mostrar = "Carrousel creada con éxito";
        obj_response.content = result;
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema creando la carrousel: " + error;
    }
    return obj_response;
};

export const update = async (id: number, data: any) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        data.fecha_modificacion = new Date();
        console.log("Data en update:", data);

        const filter = { id: Number(id) };
        console.log("Filtro de búsqueda:", filter);

        const existingCarrousel = await collection.findOne(filter);
        if (!existingCarrousel) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Carrousel no encontrada.";
            return obj_response;
        }

        console.log("Documento encontrado:", existingCarrousel);

        delete data._id;

        const updateResult = await collection.updateOne(filter, { $set: data });
        console.log("Resultado de updateOne:", updateResult);

        if (updateResult.matchedCount === 0) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Carrousel no encontrada.";
        } else if (updateResult.modifiedCount === 0) {
            obj_response.msj_a_mostrar = "Carrousel encontrada, pero no se realizaron cambios.";
        } else {
            obj_response.msj_a_mostrar = "Carrousel actualizada con éxito.";
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
        const deletedCarrousel = await CarrouselModel.findOneAndDelete({id});
        if (!deletedCarrousel) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Carrousel no encontrado";
        } else {
            obj_response.msj_a_mostrar = "Carrousel eliminado con éxito";
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema eliminando carrousel: " + error;
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