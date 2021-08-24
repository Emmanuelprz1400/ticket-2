const ModelUsers = require('../app/models/modelUser');
const jwt = require('jsonwebtoken');

// Controlador para generar token
module.exports.generateToken = async (data)=>{
    try {
        let result = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data
        }, process.env.SECRET_KEY
        )
        return result
    }catch (err){
        console.log(err)
        throw new Error (err)
    }
}

//Controlador para checar la existencia del usuario
module.exports.checkUser = async (user)=> {
    const {email, pass} = user;
    let user = new ModelUsers('', '', email, pass, '');
    try {
        let result = await user.existenceUser();
        if (result) {
            let result = await user.authentificatioUser();
            return result
        } else {
            throw new Error ('Correo y/o contraseña incorrecta');
        }
    }catch (err){
        throw new Error ('No hay registro del usuario');
    }
}

//Controlador para el registro de un nuevo usuario
module.exports.registerNewUser = async (user) => {
    const { name, surname, email, pass, phone } = user;
    let newUser = new ModelUsers(name, surname, email, pass, phone); 
    try {
        let result = await newUser.registerNewUser();
        if(result){
            let result =  await newUser.authentificatioUser();
            return result;
        } else {
            throw new Error ('No se creo el usuario, verifique su información');
        }
    } catch (error) {
        throw error;
    }  
}

//Controlador para buscar un usuario
module.exports.searchUser = async (data)=>{
    try {
        let result = await ModelUsers.infoUser(data);
        if(result != false) {
            result = result.dataValues
            return result;
        } else {
            throw new Error ('No existe el usuario')
        }
    }catch (err) {
        throw new Error ('Ocurrio un problema al buscar el usuario')
    }
}

//Controlador para actualizar un usuario
module.exports.updateUser = async (id, imagen, user) => {
    const { name, surname, email, pass, phone } = user;
    const photo = imagen;
    let userUpdate;
    let ;
    try {
    if(photo == null){
        userUpdate = new ModelUsers(name, surname, email, pass, phone, "",);
        result =  await userUpdate.updateUser(id);
    } else {
        userUpdate = new ModelUsers(name, surname, email, pass, phone, photo);
        result =  await userUpdate.updatePhoto(id);
    }   result
        let result= result.dataValues;
        return result;
    }catch (err){
        throw new Error ('No se puede actualizar el perfil');
    }
}

//Controlador para eliminar un usuario
module.exports.deleteUser = async (id) => {
    try {
        let result = await ModelUsers.deleteUser(id)
        return true;
    }catch (err){
        throw new Error ('No se pudo eliminar el usuario seleccionado')
    }
};

//Controlador para agregar un conocimiento 
module.exports.addKnowledge = async (id, knowledge) => {
    try {
        let result = await ModelUsers.addKnowledge(id, knowledge);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar el conocimiento');
    }
}

//Controlador para validar conocimiento 
module.exports.validateKnowledge = async (id) => {
    try {
        let result = await ModelUsers.validateKnowledge(id);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo validar el conocimiento');
    }
}

//Controlador para agregar una habilidad
module.exports.addSkills = async (id, skills) => {
    try {
        let result= await ModelUsers.addSkills(id, skills);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar la habilidad');
    }
}

//Controlador para validar la habilidad
module.exports.validateSkills = async (id) => {
    try {
        let result = await ModelUsers.validateSkills(id);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo validar la habilidad');
    }
}


//Controlador para agregar educación 
module.exports.addEducation = async (id, education) => {
    try {
        let result = await ModelUsers.addEducation(id, education);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo validar agregar la educación');
    }
}

//Controlador para validar la educación
module.exports.validateEducation = async (id) => {
    try {
        let result = await ModelUsers.validateEducation(id);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo validar la educación');
    }
}

//Controlador para agregar idioma 
module.exports.addLanguajes = async (id, languaje) => {
    try {
        let result = await ModelUsers.addLanguajes(id, languaje);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo validar agregar el idioma');
    }
}

//Controlador para validar el idioma
module.exports.validateLanguajes = async (id) => {
    try {
        let result = await ModelUsers.validateLanguajes(id);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo validar el idioma');
    }
}

//Controlador para agregar redes 
module.exports.addNetworks = async (id, network) => {
    try {
        let result = await ModelUsers.addNetworks(id, network);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar su red');
    }
}

//Controlador para validar la educación
module.exports.validateNetworks = async (id) => {
    try {
        let result = await ModelUsers.validateNetworks(id);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo validar las redes');
    }
}

//Controlador para agregar hobbie 
module.exports.addHobbies = async (id, hobbie) => {
    try {
        let result = await ModelUsers.addHobbies(id, hobbie);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar su pasatiempo');
    }
}

//Controlador para validar el pasatiempo
module.exports.validateHobbies = async (id) => {
    try {
        let result = await ModelUsers.validateHobbies(id);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo validar el pasatiempo');
    }
}

//Controlador para agregar un comentario
module.exports.addCommit = async (friend_id, commit) => {
    try {
        let result = await ModelUsers.addCommit(friend_id, commit);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo agregar el comentario');
    }
}

//Controlador para ver comentarios 
module.exports.viewCommit = async (id) => {
    try {
        let result = await ModelUsers.viewCommit(id);
        if(result){
            return result
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo hacer la solicitud');
    }
}

//Controlador para aceptar amigo 
module.exports.acceptedFriend = async (friend_id, friend) => {
    try {
        let result = await ModelUsers.acceptedRequest(friend_id, friend);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo hacer la solicitud');
    }
}

//Controlador para ver amigo 
module.exports.viewFriend = async (id) => {
    try {
        let result = await ModelUsers.listFriend(id);
        if(result){
            return result
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo hacer la solicitud');
    }
}

//Controlador para recibir solicitudes
module.exports.viewRequest = async (id) => {
    try {
        let result = await ModelUsers.listRequest(id);
        if(result){
            return result
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo hacer la solicitud');
    }
}

//Controlador para enviar solicitudes
module.exports.addFriend = async (friend_id, friend) => {
    try {
        let result = await ModelUsers.requestFriend(friend_id, friend);
        if(result){
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error ('No se pudo hacer la solicitud');
    }
}

