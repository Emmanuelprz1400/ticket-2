const Joi = require('joi')
const validations = require('./checkoutData');

//Validación del registro
const validateRegistration = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validations.modelRegistration, 'Los datos ingresados no son correctos para realizar el registro');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

//Validación del inicio de sesión 
const validateLogin = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validations.modelLogin, 'Los datos ingresados no son correctos para el login')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

//Validación de actualizaciones 
const validateUpdate = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validations.modeloActualizar, 'Los datos ingresados no son correctos para actualizar sus datos');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

//Validación de conocimientos
const validateKnowledge = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validations.modelKnowledge, 'Los datos ingresados no son correctos para agregar conocimientos');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

//Validación de habilidades
const validateSkills = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validations.modelSkills, 'Los datos ingresados no son correctos para agregar conocimientos');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}


//Validación de educación
const validateEducation = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validations.modelEducation, 'Los datos ingresados no son correctos para agregar estudios');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

//Validación de idiomas
const validateLanguajes = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validations.modelLanguajes, 'Los datos ingresados no son correctos para agregar idiomas');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

//Validación de perfil de Linkedin
const validateLinkedin = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validations.modelLinkedin, 'Los datos ingresados no son correctos para agregar Linkedin');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

//Validación de pasatiempos
const validateHobbies = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validations.modelHobbies, 'Los datos ingresados no son correctos para agregar en hobbies');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    validateLogin,
    validateRegistration,
    validateUpdate,
    validateKnowledge,
    validateSkills,
    validateEducation,
    validateLanguajes,
    validateLinkedin,
    validateHobbies
}