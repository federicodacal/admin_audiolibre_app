import { getNextSequence } from '../utils/collection_sequence';
const GeneroModel = require('../models/genero.model');

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

        const newGenero = new GeneroModel(genero);
        const savedGenero = await newGenero.save();
        obj_response.msj_a_mostrar = "Genero creado con éxito";
        obj_response.content = savedGenero;
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
        data.fecha_modificacion = Date.now();
        const updatedGenero = await GeneroModel.findOneAndUpdate({id}, data, { new: true });
        if (!updatedGenero) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Genero no encontrado";
        } else {
            obj_response.msj_a_mostrar = "Genero actualizado con éxito";
            obj_response.content = updatedGenero;
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema actualizando el genero: " + error;
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