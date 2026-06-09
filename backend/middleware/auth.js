import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acceso denegado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'JWTPASS');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ msg: 'Token inválido' });
    }
};