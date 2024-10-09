import mongoose from 'mongoose';
const { Schema } = mongoose;

const suscripcionSchema  = new Schema({
    id: Number,
    tipo: String,
    duracion_meses:Number,
    porcentaje_plataforma:Number
}); 

const SuscripcionModel = mongoose.model('SuscripcionModel', suscripcionSchema);
module.exports = SuscripcionModel;