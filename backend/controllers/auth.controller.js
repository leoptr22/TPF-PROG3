import { loginRequestDTO } from '../DTO/auth.dto.js';
import { loginUsuario } from '../services/auth.service.js';

export const login = async (req, res) => {
    try {
        const respuesta = await loginUsuario(loginRequestDTO(req.body));
        return res.json(respuesta);
    } catch (error) {
        console.error('Error en login:', error.message);
        return res.status(error.statusCode || 500).json({
            msg: error.message || 'Error del servidor'
        });
    }
};
