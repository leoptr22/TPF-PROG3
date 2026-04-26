const jwt = require('jsonwebtoken');
const db = require('../config/db');

const login = async (req, res) => {
    const { email, contrasenia } = req.body;

    if (!email || !contrasenia) {
        return res.status(400).json({ msg: 'Email y contraseña son obligatorios' });
    }

    const sql = `
        SELECT id_usuario, email, contrasenia, rol, activo
        FROM usuarios
        WHERE email = ? AND activo = 1
    `;

    try {
        
        const [results] = await db.query(sql, [email]);

        if (results.length === 0) {
            return res.status(401).json({ msg: 'Credenciales inválidas' });
        }

        const user = results[0];

        
        if (contrasenia !== user.contrasenia) {
            return res.status(401).json({ msg: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                rol: user.rol
            },
            process.env.JWT_SECRET || 'JWTPASS',
            { expiresIn: '2h' }
        );

        return res.json({
            msg: 'Login exitoso',
            token,
            user: {
                id_usuario: user.id_usuario,
                email: user.email,
                rol: user.rol
            }
        });
    } catch (err) {
        console.error("Error en login:", err.message);
        return res.status(500).json({ msg: 'Error del servidor', details: err.message });
    }
};

module.exports = { login };