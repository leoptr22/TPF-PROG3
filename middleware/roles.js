function authorizeRoles(...permitidos) {
    return (req, res, next) => {
        if (!permitidos.includes(req.user.rol)) {
            return res.status(403).json({ msg: 'No autorizado' });
        }
        next();
    };
}

module.exports = { authorizeRoles };
