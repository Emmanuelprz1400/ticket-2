const Joi = require('joi');

module.exports = {
    //Modelo de inicio de sesión
    modelLogin: Joi.object().keys({
        email: Joi.string().email().required().max(50),
        pass: Joi.string().required().min(4).max(50),
    }),

    //Modelo de registro
    modelRegistration: Joi.object().keys({
        name: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required().min(3).max(60),
        surname: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required().min(3).max(60),
        email: Joi.string().email().required().max(100),
        pass: Joi.string().required().min(4).max(50),
        phone: Joi.number().required()

    }),

    //Modelo de actualizar datos del registro
    modelUpdate: Joi.object().keys({
        name: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required().min(3).max(60),
        surname: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required().min(3).max(60),
        email: Joi.string().email().required().max(100),
        pass: Joi.string().required().min(8).max(20),
        phone: Joi.number().required()
    }),

    //Modelo de conocimientos
    modelKnowledges: Joi.object().keys({
        knowledges: Joi.array().items(
            Joi.object().keys({
                knowledge: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(50).required(),
            })
        )
    }),

    //Modelo de habilidades
    modelSkills: Joi.object().keys({
        skills: Joi.array().items(
            Joi.object().keys({
                skills: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(50).required(),
            })
        )
    }),
    
    //Modelo de educación
    modelEducation: Joi.object().keys({
        education: Joi.array().items(
            Joi.object().keys({
                school: Joi.string().required().max(100),
                courses: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(100).required(),
            })
        )
    }),
    
    //Modelo de idiomas
    modelLanguajes: Joi.object().keys({
        languajes: Joi.array().items(
            Joi.object().keys({
                languaje: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(20).required(),
                level: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(20).required(),
            })
        )
    }),
    
    //Modelo de redes sociales
    modelNetworks: Joi.object().keys({
        networks: Joi.array().items(
            Joi.object().keys({
                network: Joi.string().max(50).required(),
                link: Joi.string().max(100).required(),
            })
        )
    }),

    //Modelo de pasatiempos
    modelHobbies: Joi.object().keys({
        hobbies: Joi.array().items(
            Joi.object().keys({
                hobbie: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(35).required(),
            })
        )
    }),
}