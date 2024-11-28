import { getNextSequence } from '../utils/collection_sequence';
const CategoriaModel = require('../models/categoria.model');

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

        const newCategoria = new CategoriaModel(categoria);
        const savedCategoria = await newCategoria.save();
        obj_response.msj_a_mostrar = "Categoria creada con éxito";
        obj_response.content = savedCategoria;
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
        data.fecha_modificacion = Date.now();
        const updatedCategoria = await CategoriaModel.findOneAndUpdate({id}, data, { new: true });
        if (!updatedCategoria) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Categoria no encontrada";
        } else {
            obj_response.msj_a_mostrar = "Categoria actualizada con éxito";
            obj_response.content = updatedCategoria;
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