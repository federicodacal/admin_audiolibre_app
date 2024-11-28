import mongoose from 'mongoose';
const { Schema } = mongoose;

const moderadorSchema  = new Schema({
    full_name:String,
    email:String,
    pwd:String,
    id:Number,
    phone_number:String,
    state:String,
    type: {type:String, default: 'mod'},
    fecha_creacion: { type: Date, default: Date.now }, 
    fecha_modificacion: { type: Date, default: Date.now }
}, { versionKey: false }); 

const ModeradorModel = mongoose.model('ModeradorModel', moderadorSchema);
module.exports = ModeradorModel;