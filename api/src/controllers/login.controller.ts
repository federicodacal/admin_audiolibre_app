const UserModel = require('../models/user.model');
const jwt = require("jsonwebtoken");

export const login = async (req:any, res:any) => {
    let obj_response: { hubo_error: boolean; msj_a_mostrar: string; content: any, token:string } = {
        hubo_error: false,
        msj_a_mostrar: "",
        content: {},
        token: "",
    };

    const { email, pwd } = req.body;

    if (!email || !pwd) {
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Email y clave son requeridos.";
        return res.status(400).json(obj_response);
    }

    try {
        const user = await UserModel.findOne({'email':email});
    
        if(user.pwd !== pwd) {
            obj_response.msj_a_mostrar = "La clave ingresada es incorrecta.";
            return res.status(500).json(obj_response);
        }
    
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});
    
        //res.cookie("token", token, {
        //    httpOnly: true
        //});

        obj_response.token = token;
        obj_response.msj_a_mostrar = "Login éxito.";
        return res.status(200).json(obj_response);

    } catch (error) {
        console.error('Error en el login:', error);
        obj_response.hubo_error = true;
        obj_response.msj_a_mostrar = "Error interno del servidor.";
        return res.status(500).json(obj_response);
    }

};

export const mostrar_view_login  = async (req:any, res:any) => {
    res.render('login')
};

module.exports = {
    login,
    mostrar_view_login
};