const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a la base de datos MongoDB: ', mongoose.connection.name);
    }
    catch (err:any) {
        console.log('Ocurrió un problema al conectarse a MongoDB: ' + err.message);
    }
}

mongoose.connection.on('connected', () => {
    console.log('Conexión a MongoDB establecida');
});


module.exports = connectDB;