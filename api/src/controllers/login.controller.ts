const UserModel = require('../models/user.model');
const jwt = require("jsonwebtoken");

export const login = async (req:any, res:any) => {
    let obj_response: { hubo_error: boolean; msj_a_mostrar: string; content: any } = {
        hubo_error: false,
        msj_a_mostrar: "",
        content: {}
    };

    const { email, password } = req.body;

    //console.log(req.body);

    const user = await UserModel.findOne({'email':email});

    //console.log(user);

    if(user.pwd !== password) {
        obj_response.msj_a_mostrar = "La clave ingresada es incorrecta.";
        return res.status(500).json(obj_response);
    }

    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});

    res.cookie("token", token, {
        httpOnly: true
    });

    return res.redirect('/api/suscripciones');
};

export const mostrar_view_login  = async (req:any, res:any) => {
    res.render('login')
};

module.exports = {
    login,
    mostrar_view_login
};