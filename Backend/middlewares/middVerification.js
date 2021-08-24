const jwt = require('jsonwebtoken');

//Hacer verificación a través de un token
module.exports.verificationUser = async (req, res, next) =>{
    let token = req.headers.authorization
    if (token != undefined){
        try {
            let tokenchk = token.split(' ')[1]
            let verificado = jwt.verify(tokenchk, process.env.SECRET_KEY)
            if (verificado){
             return next               
            } else {
                throw new Error ('El token es inválido')  
            }
        } catch (error) {
            res.status(400).json({error: 'No cuenta con los permisos, necesitas de un token '})
        }
    }
}