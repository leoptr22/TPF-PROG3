import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { loginResponseDTO } from '../DTO/auth.dto.js';
import { buscarUsuarioActivoPorEmail } from '../queries/auth.queries.js';

const crearError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');

const validarContrasenia = (contraseniaIngresada, contraseniaGuardada) => {
    return contraseniaIngresada === contraseniaGuardada || sha256(contraseniaIngresada) === contraseniaGuardada;
};

export const loginUsuario = async ({ email, contrasenia }) => {
    if (!email || !contrasenia) {
        throw crearError('Email y contrasenia son obligatorios', 400);
    }

    const user = await buscarUsuarioActivoPorEmail(email);

    if (!user || !validarContrasenia(contrasenia, user.contrasenia)) {
        throw crearError('Credenciales invalidas', 401);
    }

    const token = jwt.sign(
        {
            id_usuario: user.id_usuario,
            rol: user.rol
        },
        process.env.JWT_SECRET || 'JWTPASS',
        { expiresIn: '2h' }
    );

    return loginResponseDTO(user, token);
};
