export const loginRequestDTO = ({ email, contrasenia }) => ({
    email,
    contrasenia
});

export const loginResponseDTO = (user, token) => ({
    msg: 'Login exitoso',
    token,
    user: {
        id_usuario: user.id_usuario,
        email: user.email,
        rol: user.rol
    }
});
