import mongoose from 'mongoose';
const { Schema } = mongoose;

const categoriaSchema  = new Schema({
    id:Number,
    nombre:String,
    fecha_creacion: { type: Date, default: Date.now }, 
    fecha_modificacion: { type: Date, default: Date.now }
}, { versionKey: false }); 

const CategoriaModel = mongoose.model('CategoriaModel', categoriaSchema);
module.exports = CategoriaModel;