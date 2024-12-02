import { 
    getAll, getOneById, create, update, deleteOne 
} from '../services/categoria_service';

export const obtenerTodas  = async (req:any, res:any) => {
    const response = await getAll();

    if(!response.hubo_error) {
        const categorias = response.content;
        res.status(200).send(categorias);
    }
    else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const obtenerPorId = async (req:any, res:any) => {
    const { id } = req.params;
    const response = await getOneById(id);

    if (!response.hubo_error) {
        const categoria = response.content;
        res.status(200).send(categoria);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const crearCategoria = async (req:any, res:any) => {
    const data = req.body;
    const response = await create(data);

    if (!response.hubo_error) {
        res.status(201).send(response.content);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const actualizarCategoria = async (req:any, res:any) => {
    const { id } = req.params;
    const data = req.body;
    const response = await update(id, data);

    if (!response.hubo_error) {
        res.status(200).send(response.content);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const eliminarCategoria = async (req:any, res:any) => {
    const { id } = req.params;
    const response = await deleteOne(id);

    if (!response.hubo_error) {
        res.status(200).send(response.msj_a_mostrar);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};


module.exports = {
    obtenerTodas,
    obtenerPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};