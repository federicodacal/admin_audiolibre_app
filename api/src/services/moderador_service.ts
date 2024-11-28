import { getNextSequence } from '../utils/collection_sequence';
const ModeradorModel = require('../models/moderador.model');

export const getAll = async() => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const data = await ModeradorModel.find();
        obj_response.msj_a_mostrar = "OK";
        obj_response.content = data;
        return obj_response;
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema obteniendo los moderadores: " + error;
        return obj_response;
    }
}

export const getOneById = async (id:number) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const data = await ModeradorModel.findOne({id});
        if (!data) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = `Moderador ${id} no encontrado`;
        } else {
            obj_response.msj_a_mostrar = "OK";
            obj_response.content = data;
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema obteniendo el moderador: " + error;
    }
    return obj_response;
};

export const create = async (moderador:any) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {

        moderador.id = await getNextSequence('moderador_id');

        const newModerador = new ModeradorModel(moderador);
        const savedModerador = await newModerador.save();
        obj_response.msj_a_mostrar = "Moderador creado con éxito";
        obj_response.content = savedModerador;
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema creando el moderador: " + error;
    }
    return obj_response;
};

export const update = async (id:number, data:any) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        data.fecha_modificacion = Date.now();
        const updatedModerador = await ModeradorModel.findOneAndUpdate({id}, data, { new: true });
        if (!updatedModerador) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Moderador no encontrado";
        } else {
            obj_response.msj_a_mostrar = "Moderador actualizado con éxito";
            obj_response.content = updatedModerador;
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema actualizando el moderador: " + error;
    }
    return obj_response;
};

export const deleteOne = async (id:number) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const deletedModerador = await ModeradorModel.findOneAndDelete({id});
        if (!deletedModerador) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Moderador no encontrado";
        } else {
            obj_response.msj_a_mostrar = "Moderador eliminado con éxito";
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema eliminando el moderador: " + error;
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