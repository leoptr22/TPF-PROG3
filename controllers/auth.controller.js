const jwt = require('jsonwebtoken');
const db = require('../config/db');

const login = (req, res) => {
    const { email, contrasenia } = req.body;

    if (!email || !contrasenia) {
        return res.status(400).json({ msg: 'Email y contraseña son obligatorios' });
    }

    const sql = `
        SELECT id_usuario, email, contrasenia, rol, activo
        FROM usuarios
        WHERE email = ? AND activo = 1
    `;

    db.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ msg: 'Error del servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ msg: 'Credenciales inválidas' });
        }

        const user = results[0];

        // Compara directo con el hash guardado en BD
        if (contrasenia !== user.contrasenia) {
            return res.status(401).json({ msg: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                rol: user.rol
            },
            process.env.JWT_SECRET,
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
    });
};

module.exports = { login };