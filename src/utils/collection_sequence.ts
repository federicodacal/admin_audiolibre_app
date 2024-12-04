const CounterModel = require('../models/counter.model');

export const getNextSequence = async (sequenceName:String) => {
    try {
        await CounterModel.updateOne(
            { _id: sequenceName }, 
            { $inc: { sequence_value: 1 } }, 
            { upsert: true } 
        );
        const counter = await CounterModel.findOne({ _id: sequenceName });

        console.log('Counter actualizado: ', counter);

        if (counter && counter.sequence_value !== undefined) {
            return counter.sequence_value;
        } else {
            console.error('Error: sequence_value no encontrado en counter.');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener secuencia:', error);
        return null;
    }
};