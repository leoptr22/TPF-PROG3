import db from '../config/db.js';

export const buscarUsuarioActivoPorEmail = async (email) => {
    const sql = `
        SELECT id_usuario, email, contrasenia, rol, activo
        FROM usuarios
        WHERE email = ? AND activo = 1
    `;

    const [results] = await db.query(sql, [email]);
    return results[0];
};
