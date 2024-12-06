const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000, 
            socketTimeoutMS: 60000,
            connectTimeoutMS: 30000
        });
        console.log('Conectado a la base de datos MongoDB: ', mongoose.connection.name);
    }
    catch (err:any) {
        console.log('Ocurrió un problema al conectarse a MongoDB: ' + err.message);
    }
}

mongoose.connection.on('connected', () => {
    console.log('Conexión a MongoDB establecida. Iniciando ping periódico...');
    setInterval(async () => {
        try {
            if(mongoose.connection.db) {
                /*
                const admin = mongoose.connection.db.admin();
                const result = await admin.ping();
                console.log('Ping exitoso a MongoDB:', result); */
                if (mongoose.connection.readyState === 1) {
                    console.log('Manteniendo viva la conexión a MongoDB...');
                    mongoose.connection.db.command({ ping: 1 });
                }
            }
        } catch (err) {
            console.error('Error al hacer ping a MongoDB:', err);
        }
    }, 100000);
});

mongoose.connection.on('error', (err:any) => {
    console.error('Error en la conexión a MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB desconectado. Intentando reconectar...');
    setTimeout(async () => {
        try {
            await connectDB();
            console.log('Reconexión exitosa a MongoDB.');
        } catch (err) {
            console.error('Error al reconectar a MongoDB:', err);
        }
    }, 5000);
});

mongoose.connection.on('reconnected', () => {
    console.log('Reconectado a MongoDB.');
});


module.exports = connectDB;