const CounterModel = require('../models/counter.model');

export const getNextSequence = async (sequenceName:String) => {
    const counter = await CounterModel.findByIdAndUpdate(
        sequenceName,
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    return counter.sequence_value;
};