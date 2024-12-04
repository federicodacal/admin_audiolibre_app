import mongoose from 'mongoose';
import { 
   getAll, getOneById, create, update, deleteOne 
} from '../services/carrousel_service';


export const obtenerTodas = async (req:any, res:any) => {
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

export const obtenerImagenPorId = async (req: any, res: any) => {
    const fileId = req.params.id;
    console.log("Solicitando imagen con ID:", fileId);

    // Conectar a la base de datos
    const conn = mongoose.connection;

    if(!conn.readyState) {
        return res.status(500).send('Base de datos no conectado');
    }

    if(!conn.db) {
        return res.status(500).send('Conexión de base de datos no válida');
    }

    const gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'images' });

    try {
        // Verificar si el archivo existe
        const file = await conn.db.collection('images.files').findOne({ _id: new mongoose.mongo.ObjectId(fileId) });
        if (!file) {
            return res.status(404).send('Imagen no encontrada');
        }

        // Establecer el tipo de contenido
        res.set('Content-Type', file.contentType || 'application/octet-stream');

        // Iniciar el stream de descarga
        const downloadStream = gfs.openDownloadStream(file._id);

        // Pipe del stream directamente a la respuesta
        downloadStream.pipe(res).on('error', (error:any) => {
            console.error('Error al enviar la imagen:', error);
            res.status(500).send('Error al obtener la imagen');
        });
        
        downloadStream.on('finish', () => {
            console.log('Imagen enviada correctamente');
        }); 
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        res.status(500).send('Error al obtener la imagen');
    }
};


module.exports = {
   obtenerTodas,
   obtenerPorId,
   crearCarrousel,
   actualizarCarrousel,
   eliminarCarrousel,
   obtenerImagenPorId
};