export const login = async (req:any, res:any) => {
    const { username, password } = req.body;

    const validUsername = 'pepe_usuario';
    const validPassword = '1234';

    if (username === validUsername && password === validPassword) {
        res.redirect('/api/suscripciones/');
    } else {
        res.render('error');
    }
};

export const mostrar_view_login  = async (req:any, res:any) => {
    res.render('login')
};

module.exports = {
    login,
    mostrar_view_login
};