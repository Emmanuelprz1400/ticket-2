const controlateUser = require('../controllers/controllersUser');
const middAuth = require('../../middlewares/middVerification');
const middCheck = require('../../middlewares/middData');
const middImg = require('../../middlewares/middImg');
const fs = require("fs");


module.exports = async(app)=> {
    
    //Ruta para iniciar sesión
    app.post('/login', middCheck.validateLogin, async (req,res)=>{
        let user = req.body
        try {
            let resultado = await controlateUser.checkUser(user)
            if (resultado != false){
                let tokenResult = await controlateUser.generateToken(usuario)
                res.status(200).json({ token: tokenResult, user: resultado })
            }else {
                throw new Error ("Correo y/o contraseña incorrecta")
            }
        }catch (err){
            res.status(400).json({ error: err.message}) 
        }
    });

    //Ruta para registrar un nuevo usuario
    app.post('/signup', middCheck.validateRegistration, async (req,res)=>{
        let user = req.body
        try {
            let resultado = await controlateUser.registerNewUser(user)
            if (resultado != false){
                let tokenResult = await controlateUser.generateToken(user)
                res.json({ token: tokenResult, user: resultado })
            }else {
                throw new Error ("Correo y/o contraseña incorrecta")
            }
        }catch (err){
            res.status(400).json({ error: err.message}) 
        }
    });

    //Ruta para obtener información de todo los usuarios amigos
    app.get('/usuarios', middAuth.verificationUser, async (req, res) => {
        let data = req.params.id;
        try{
            let resultado = await controlateUser.searchUser(data);
            resultado.forEach(element => {
                if(element.photo != null){
                    element.photo = element.photo.toString('base64');
                }
            });
            res.status(200).json({user:resultado});
        }catch (err){
            res.status(400).json('No se puede mostrar el usuario')
        }
    });

    //Ruta para recuperar la información de usuario por ID
    app.get('/usuario/:id', middAuth.verificationUser, async (req, res) => {
        let data = req.params.id;
        try{
            let resultado = await controlateUser.searchUser(data);
            if(resultado.photo != null){
                let phot = resultado.foto.toString('base64')
                res.status(200).json({user:resultado, photo:phot});
            } else {
                res.status(200).json({user:resultado});
            }

        }catch (err){
            res.status(400).json('No se puede mostrar usuario')
        }
    })

    //Ruta para modificar datos de un Usuario por ID (interacción con archivos del sistema)
    app.post('/usuario/:id', middImg, middCheck.validateUpdate, async (req, res) => {
        let id = req.params.id;
        let photo;
        let havePhoto = req.file
        if(havePhoto == undefined){
            photo = null
        } else {
            photo = fs.readFileSync("uploads/" + req.file.filename);
        }
        let user = req.body;
        console.log(user);
        try {
            let resultado = await controlateUser.updateUser(id, photo, user);
                res.json({ user: resultado })
        }catch (err){
            res.status(400).json({ error: err.message}) 
        }
    })

    //Ruta para eliminar un usuario por ID
    app.delete('/delete/:id', middAuth.verificationUser, async (req,res)=>{
        let data = req.params.id;
        try {
            let resultado = await controlateUser.deleteUser(data)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo eliminar"})
        }
    })

    //Ruta para agregar conocimiento
    app.post('/conocimiento/:id', middAuth.verificationUser, middCheck.validateKnowledge, async (req, res) => {
        let id = req.params.id;
        let knowledge = req.body;
        try {
            let resultado = await controlateUser.addKnowledge(id, knowledge)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrió un error no se pudo agregar"})
        }
    })
    //Ruta para que el contacto valide el conocimiento
    app.post('/validar/conocimiento/:id', middAuth.verificationUser, async (req, res) => {
        let id = req.params.id;
        try {
            let resultado = await controlateUser.validateKnowledge(id)
            if(resultado){
                res.status(200).json('ok');
            }      
        }catch (error){
            res.status(400).json({error: "Ocurrio un error no se pudo validar"})
        }
    })

       //Ruta para agregar habilidad
   app.post('/habilidad/:id', middAuth.verificationUser, middCheck.validateSkills, async (req, res) => {
    let id = req.params.id;
    let skill = req.body;
    try {
        let resultado = await controlateUser.addSkills(id, skill)
        if(resultado){
            res.status(200).json('ok');
        }      
    }catch (error){
        res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
    }
})

//Ruta para que el contacto valide la habilidad
app.post('/validar/habilidad/:id', middAuth.verificationUser, async (req, res) => {
    let id = req.params.id;
    try {
        let resultado = await controlateUser.validateSkills(id)
        if(resultado){
            res.status(200).json('ok');
        }      
    }catch (error){
        res.status(400).json({error: "Ocurrio un error no se pudo validar"})
    }
})

//Ruta de educación
app.post('/educacion/:id', middAuth.verificationUser, middCheck.validateEducation, async (req, res) => {
    let id = req.params.id;
    let education = req.body;
    try {
        let resultado = await controlateUser.addEducation(id, education)
        if(resultado){
            res.status(200).json('ok');
        }      
    }catch (error){
        res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
    }
})

//Ruta de idiomas
app.post('/idioma/:id', middAuth.verificationUser, middCheck.validateLanguajes, async (req, res) => {
    let id = req.params.id;
    let languaje = req.body;
    try {
        let resultado = await controlateUser.addLanguajes(id, languaje)
        if(resultado){
            res.status(200).json('ok');
        }      
    }catch (error){
        res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
    }
})

//Ruta de Linkedin
app.post('/linkedin/:id', middAuth.verificationUser, middCheck.validateLinkedin, async (req, res) => {
    let id = req.params.id;
    let linkedin = req.body;
    try {
        let resultado = await controlateUser.addLinkedin(id, linkedin)
        if(resultado){
            res.status(200).json('ok');
        }      
    }catch (error){
        res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
    }
})

//Ruta de hobbies
app.post('/hobbies/:id', middAuth.verificationUser, middCheck.validateHobbies, async (req, res) => {
    let id = req.params.id;
    let hobbie = req.body;
    try {
        let resultado = await controlateUser.addHobbies(id, hobbie)
        if(resultado){
            res.status(200).json('ok');
        }      
    }catch (error){
        res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
    }
})  

//Rutas de comentarios
app.post('/comentarios/:id', middAuth.verificationUser, async (req, res) => {
    let friend_id = req.params.id;
    let commit = req.body;
    try {
        let resultado = await controlateUser.viewCommit(friend_id, commit)
        if(resultado){
            res.status(200).json('ok');
        }      
    }catch (error){
        res.status(400).json({error: "Ocurrio un error no se pudo agregar"})
    }
})  

app.get('/comentarios/:id', middAuth.verificationUser, async (req, res) => {
    let friend_id = req.params.id;
    try {
        let resultado = await controlateUser.viewCommit(friend_id)
        if(resultado){
            res.status(200).json(resultado);
        }      
    }catch (error){
        res.status(400).json({error: "Ocurrio un error no se puede mostrar"})
    }
})

//Ruta de amigos 
//Ruta para agregar un amigo
app.post('/solicitud/:id', middAuth.verificationUser, async (req, res) => {
    let friend_id = req.params.id;
    let friend = req.body;
    try {
        let resultado = await controlateUser.addFriend(friend, friend_id)
        if(resultado){
            res.status(200).json('ok');
        }      
    }catch (error){
        res.status(400).json({error: "Ocurrio un error no se puede mostrar"})
    }
})

//Ruta para aceptar un amigo   
app.post('/aceptar/:id', middAuth.verificationUser, async (req, res) => {
    let friend_id = req.params.id;
    let friend = req.body;
    try {
        let resultado = await controlateUser.acceptedFriend(friend_id, friend)
        if(resultado){
            res.status(200).json('ok');
        }      
    }catch (error){
        res.status(400).json({error: "Ocurrio un error no se puede aceptar"})
    }
})

//Ruta para ver solicitud
app.get('/solicitudes/:id', middAuth.verificationUser, async (req, res) => {
    let id = req.params.id;
    try {
        let resultado = await controlateUser.viewRequest(id)
        if(resultado){
            res.status(200).json(resultado);
        }      
    }catch (error){
        res.status(400).json({error: "Ocurrio un error no se puede mostrar"})
    }
})

//Ruta para ver un amigo
app.get('/amigos/:id', middAuth.verificationUser, async (req, res) => {
    let id = req.params.id;
    try {
        let resultado = await controlateUser.viewFriend(id)
        if(resultado){
            res.status(200).json(resultado);
        }      
    }catch (error){
        res.status(400).json({error: "Ocurrio un error no se puede mostrar"})
    }
})
}