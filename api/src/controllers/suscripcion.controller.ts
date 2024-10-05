const obtener_suscripciones = async (req:any, res:any) => 
{
        let obj_response = {hubo_error: false, msj_a_mostrar:"" ,content: {}}
        
        try 
        {
            obj_response.msj_a_mostrar = "Suscripciones...";
            res.status(200).json(obj_response);
        } 
        catch (error) 
        {
            console.log(error);
            obj_response.hubo_error = true;
            obj_response.msj_a_mostrar = "Ocurrió un problema. Por favor, intente nuevamente.";
            res.status(500).json(obj_response);
        }
}

module.exports = {obtener_suscripciones};