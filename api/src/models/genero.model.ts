import mongoose from 'mongoose';
const { Schema } = mongoose;

const generoSchema  = new Schema({
    id:Number,
    nombre:String,
    fecha_creacion: { type: Date, default: Date.now }, 
    fecha_modificacion: { type: Date, default: Date.now }
}, { versionKey: false }); 

const GeneroModel = mongoose.model('GeneroModel', generoSchema);
module.exports = GeneroModel;