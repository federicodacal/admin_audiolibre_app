import mongoose from 'mongoose';
const { Schema } = mongoose;

const suscripcionSchema  = new Schema({
    id:Number,
    titulo:String,
    duracion_dias:Number,
    porcentaje_plataforma:Number,
    precio:Number,
    fecha_creacion: { type: Date, default: Date.now }, 
    fecha_modificacion: { type: Date, default: Date.now }
}, { versionKey: false }); 

const SuscripcionModel = mongoose.model('SuscripcionModel', suscripcionSchema);
module.exports = SuscripcionModel;