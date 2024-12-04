import mongoose from 'mongoose';
const { Schema } = mongoose;

const carrouselSchema  = new Schema({
    titulo:String,
    id: {type: Number, unique: true},
    descripcion:String,
    file_id: { type: Schema.Types.ObjectId, ref: 'images.files' },
    fecha_creacion: { type: Date, default: Date.now }, 
    fecha_modificacion: { type: Date, default: Date.now }
}, { versionKey: false }); 

const CarrouselModel = mongoose.model('CarrouselModel', carrouselSchema);
module.exports = CarrouselModel;