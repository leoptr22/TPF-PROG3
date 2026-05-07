const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            estado: false,
            message: 'Error de validación',
            errors: errors.array()
        });
    }
    next();
};

module.exports = { validarCampos };