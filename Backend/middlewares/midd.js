const rateLimit = require('express-rate-limit'); 

const corsOptions = {
    origin : function (origin, callback) {
        if (process.env.LISTABLANCA.indexOf(origin)){
            callback (null, true)
        }else {
            callback( new Error('Usted no está autorizado a ingresar a mi API por Cors'))
        }
    }
}
// límite de tiempo de 15 min y de la cantidad de accesos a la API 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: 'Usted excedió el limite máximo de ingresos a la API, intente más tarde'
});

module.exports = {corsOptions, limiter}