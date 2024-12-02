import { getNextSequence } from '../utils/collection_sequence';
const CarrouselModel = require('../models/carrousel.model');

export const getAll = async() => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        const data = await CarrouselModel.find();
        obj_response.content = data.map((item:any) => ({
            ...item.toObject(),
            imgUrl: `http://localhost:5000/api/carrousel/imagen/${item.file_id}`
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
                imgUrl: `http://localhost:5000/api/carrousel/imagen/${data.file_id}`
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

    try {

        carrousel.id = await getNextSequence('carrousel_id');

        const newCarrousel = new CarrouselModel(carrousel);
        const savedCarrousel = await newCarrousel.save();
        obj_response.msj_a_mostrar = "Carrousel creada con éxito";
        obj_response.content = savedCarrousel;
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema creando la carrousel: " + error;
    }
    return obj_response;
};

export const update = async (id:number, data:any) => {
    let obj_response = { hubo_error: false, msj_a_mostrar: "", content: {} };

    try {
        data.fecha_modificacion = Date.now();
        const updatedCarrousel = await CarrouselModel.findOneAndUpdate({id}, data, { new: true });
        if (!updatedCarrousel) {
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Carrousel no encontrada";
        } else {
            obj_response.msj_a_mostrar = "Carrousel actualizada con éxito";
            obj_response.content = updatedCarrousel;
        }
    } catch (error) {
        console.error(error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Ocurrió un problema actualizando carrousel: " + error;
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