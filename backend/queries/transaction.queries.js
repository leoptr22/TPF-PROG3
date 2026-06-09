import db from '../config/db.js';

export const ejecutarEnTransaccion = async (callback) => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
        const resultado = await callback(connection);
        await connection.commit();
        return resultado;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
