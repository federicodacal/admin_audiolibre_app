import { 
    getAll, getOneById, create, update, deleteOne 
} from '../services/genero_service';

export const obtenerTodos  = async (req:any, res:any) => {
    const response = await getAll();

    if(!response.hubo_error) {
        const generos = response.content;
        res.status(200).send(generos);
    }
    else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const obtenerPorId = async (req:any, res:any) => {
    const { id } = req.params;
    const response = await getOneById(id);

    if (!response.hubo_error) {
        const genero = response.content;
        res.status(200).send(genero);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const crearGenero = async (req:any, res:any) => {
    const data = req.body;
    const response = await create(data);

    if (!response.hubo_error) {
        res.status(201).send(response.content);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const actualizarGenero = async (req:any, res:any) => {
    const { id } = req.params;
    const data = req.body;
    const response = await update(id, data);

    if (!response.hubo_error) {
        res.status(200).send(response.content);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const eliminarGenero = async (req:any, res:any) => {
    const { id } = req.params;
    const response = await deleteOne(id);

    if (!response.hubo_error) {
        res.status(200).send(response.msj_a_mostrar);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};


module.exports = {
    obtenerTodos,
    obtenerPorId,
    crearGenero,
    actualizarGenero,
    eliminarGenero
};