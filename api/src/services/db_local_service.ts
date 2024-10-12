import { Suscripcion } from '../models/suscripcion';
const pool = require('../database/local_database');  
export const obtenerTodas = (): Promise<Suscripcion[]> => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err: any, connection: any) => {
            if (err) {
                return reject(err);
            }
            const query = 'SELECT * FROM suscripciones';
            connection.query(query, (err: any, results: any) => {
                connection.release(); 
                if (err) {
                    return reject(err);
                }
                resolve(results as Suscripcion[]);
            });
        });
    });
};

export const obtenerPorId = (id: number): Promise<Suscripcion | null> => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err: any, connection: any) => {
            if (err) {
                return reject(err);
            }
            const query = 'SELECT * FROM suscripciones WHERE id = ?';
            connection.query(query, [id], (err: any, results: any) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(results.length ? (results[0] as Suscripcion) : null);
            });
        });
    });
};

export const insertarSuscripcion = (suscripcion: Suscripcion): Promise<number> => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err: any, connection: any) => {
            if (err) {
                return reject(err);
            }
            const query = 'INSERT INTO suscripciones (tipo, duracion_meses, porcentaje_plataforma) VALUES (?, ?, ?)';
            connection.query(query, [suscripcion.tipo, suscripcion.duracion_meses, suscripcion.porcentaje_plataforma], (err: any, result: any) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve((result as any).insertId);  // 'insertId' es un campo específico de mysql
            });
        });
    });
};

export const actualizarSuscripcion = (suscripcion: Suscripcion): Promise<number> => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err: any, connection: any) => {
            if (err) {
                return reject(err);
            }
            const query = 'UPDATE suscripciones SET tipo = ?, duracion_meses = ?, porcentaje_plataforma = ? WHERE id = ?';
            connection.query(query, [suscripcion.tipo, suscripcion.duracion_meses, suscripcion.porcentaje_plataforma, suscripcion.id], (err: any, result: any) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve((result as any).affectedRows); // 'affectedRows' es un campo específico de mysql
            });
        });
    });
};

export const eliminarSuscripcion = (id: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err: any, connection: any) => {
            if (err) {
                return reject(err);
            }
            const query = 'DELETE FROM suscripciones WHERE id = ?';
            connection.query(query, [id], (err: any, result: any) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve((result as any).affectedRows);  // 'affectedRows' es un campo específico de mysql
            });
        });
    });
};
