const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./Backend/DB/connection');

//Middleware para captura de errores globales.
app.use((err, res, next)=> {
    console.log(err);
    if (!err){
        return next();
    }
    return res.status(500).json('Se produjo un error, inténtelo de nuevo')
});

//Vistas
const viewUser = require('./Backend/app/views/viewUser');
app.use(express.json());
app.use(cors());
viewUser(app);

//Modelos base de datos
const index = require ('./Backend/DB/index')

//Iniciar el Servidor
async function starServer() {
    try {
        await index.sync();
        await sequelize.authenticate();
        console.log('Conexión establecida con la DB');
        app.listen(process.env.PORT, function (){
            console.log(`Sistema iniciado en el puerto ${process.env.PORT}`);
        })
    }catch (err){
        console.log('No fue posible conectar la DB');
        console.log(err);
    }
} 

starServer();

