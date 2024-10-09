import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'admin_audiolibre_db'
})

connection.connect((err:any) => {
    if(err) {
        console.error("Ocurrió un problema conectando a la base de datos: ", err);
        return;
    }
    console.log("Conexión exitosa");
});

module.exports = connection;

