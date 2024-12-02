import { 
    getAll, getOneById, create, update, deleteOne 
} from '../services/moderador_service';

export const obtenerTodos  = async (req:any, res:any) => {
    const response = await getAll();

    if(!response.hubo_error) {
        const moderadores = response.content;
        res.status(200).send(moderadores);
    }
    else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const obtenerPorId = async (req:any, res:any) => {
    const { id } = req.params;
    const response = await getOneById(id);

    if (!response.hubo_error) {
        const moderador = response.content;
        res.status(200).send(moderador);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const crearModerador = async (req:any, res:any) => {
    const data = req.body;
    const response = await create(data);

    if (!response.hubo_error) {
        res.status(201).send(response.content);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const actualizarModerador = async (req:any, res:any) => {
    const { id } = req.params;
    const data = req.body;
    const response = await update(id, data);

    if (!response.hubo_error) {
        res.status(200).send(response.content);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const eliminarModerador = async (req:any, res:any) => {
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
    crearModerador,
    actualizarModerador,
    eliminarModerador
};