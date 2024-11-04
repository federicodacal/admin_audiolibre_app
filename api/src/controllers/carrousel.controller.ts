import { 
   getAll, getOneById, create, update, deleteOne 
} from '../services/carrousel_service';


export const obtenerTodas  = async (req:any, res:any) => {
   const response = await getAll();

   if(!response.hubo_error) {
       const carrousel = response.content;
       res.status(200).send(carrousel);
   }
   else {
       res.status(500).send(response.msj_a_mostrar);
   }
};

export const obtenerPorId = async (req:any, res:any) => {
   const { id } = req.params;
   const response = await getOneById(id);

   if (!response.hubo_error) {
       const suscripcion = response.content;
       res.status(200).send(suscripcion);
   } else {
       res.status(500).send(response.msj_a_mostrar);
   }
};

export const crearCarrousel = async (req:any, res:any) => {

    console.log('Datos recibidos:', req.body);
    console.log('Archivo recibido:', req.file);
    const data = req.body;

    if (!req.file) {
        return res.status(404).send('No se envió la imagen');
    }

    // Guardar el ID del archivo en el modelo
    data.file_id = req.file.id;

    const response = await create(data);
    if (!response.hubo_error) {
        res.status(201).send(response.content);
    } else {
        res.status(500).send(response.msj_a_mostrar);
    }
};

export const actualizarCarrousel = async (req:any, res:any) => {
   const { id } = req.params;
   const data = req.body;
   const response = await update(id, data);

   if (!response.hubo_error) {
       res.status(200).send(response.content);
   } else {
       res.status(500).send(response.msj_a_mostrar);
   }
};

export const eliminarCarrousel = async (req:any, res:any) => {
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
   crearCarrousel,
   actualizarCarrousel,
   eliminarCarrousel
};