import mongoose from 'mongoose';
const { Schema } = mongoose;

const counterSchema  = new Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, required: true },
}, { versionKey: false }); 

const CounterModel = mongoose.model('CounterModel', counterSchema);
module.exports = CounterModel;