import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema  = new Schema({
    email: String,
    pwd: String
}); 

const UserModel = mongoose.model('UserModel', userSchema);
module.exports = UserModel;