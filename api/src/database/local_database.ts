import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});

pool.getConnection((err:any, conn:any) => {
    if(err) {
        console.error("Ocurrió un problema conectando a la base de datos: ", err);
        return;
    }
    console.log("Conexión exitosa");
    conn.release();
});

module.exports = pool;

