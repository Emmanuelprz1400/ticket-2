const sequelize = require('../../DB/connection')
const Users = require('../../DB/dbUser')
const Friends = require('../../DB/dbFriends')
const Commits = require('../../DB/dbCommits')
const Knowledges = require('../../DB/dbKnowledge')
const Skills = require('../../DB/dbSkills')
const Education = require('../../DB/dbEducation')
const Languajes = require('../../DB/dbLanguajes')
const Networks = require('../../DB/dbNetworks')
const Hobbies = require('../../DB/dbHobbies')

//Clase de usuario
module.exports = class ModelUsers {
    constructor(name, surname, email, pass, country, city, photo) {        
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.pass = pass;
        this.country = country;
        this.city = city;
        this.ciudad = ciudad;
        this.photo = photo;
      }   
}

 //Modelo para registrar un usuario 
 registerNewUser = async () => {
    let existUser = await this.existenceUser();
    if(existUser)
        throw new Error('Usuario ya registrado');
    else {
        try {
            await User.create({    
              name: this.name,
              surname: this.surname,
              email: this.email,
              pass: this.pass,
              country: this.country,
              city: this.city,
              photo: this.photo
            });
            return true
        } catch (err){
            throw new Error('No se pudo registrar el usuario')
        }
    }
  }

 //Modelo para ver la existencia de un usuario 
 existenceUser = async ()=>{
    let resultado = await User.findOne({where: {email: this.email}})
    if (resultado === null){
        return false
    }else {
        return true
    }
  }

 //Modelo para auntentificar un usuario 
  authentificateUser = async ()=>{
    let resultado = await User.findOne({where: {email: this.email, pass: this.pass}})
    if (resultado === null){
        return false
    }else {
        return resultado
    }
  }

  //Modelo para actualizar un usuario
  updateUser = async (id) => {        
    try {
      let modificate = await User.findOne({where: {id: id}})
      if(modificate != null)
      {
        await User.update({
            name: this.name,
            surname: this.surname,
            email: this.email,
            pass: this.pass,
            country: this.country,
            city: this.city,
            photo: this.photo
        }, 
          {where: { id : id}})
          let modificateUser = await Usuarios.findOne({where: {id: id}})
        return modificateUser;
      }
    } catch (error) {
      throw new Error ('No fue posible actualizar los datos')
    }        
  }

  //Modelo para actualizar foto
  updatePhoto = async (id) => {        
    try {
      let modificate = await User.findOne({where: {id: id}})
      if(modificate != null)
      {
        await User.update({
            name: this.name,
            surname: this.surname,
            email: this.email,
            pass: this.pass,
            country: this.country,
            city: this.city,
            photo: this.photo
        }, 
          {where: { id : id}})
          let modificateUser = await User.findOne({where: {id: id}})
        return modificateUser;
      }
    } catch (error) {
      throw new Error ('No fue posible actualizar la foto')
    }        
  }

  //Modelo para listar amigos
  listUsers = async () => {
    try{
      let resultado = await User.findAll({
        attributes: ['id', 'name', 'surname', 'photo']
      })
      return resultado
    } catch(error) {
        throw new Error ('No se pudo desplegar la lista de usuarios')
    }
  }

  //Modelo para ver la info de usuario
  infoUser = async (id) => {
    try{
      let resultado = await User.findOne({
        where: { id : id },
        attributes: ['id', 'name', 'surname', 'email', 'pass', 'country', 'city', 'photo'],
        include: [                                                        
          {
            model: Knowledges,
            attributes: ['knowledge','validate'],                        
          },
          {
            model: Skills,
            attributes: ['skill', 'validate'],                        
          },
          {
            model: Languaje,
            attributes: ['languaje', 'level'],                        
          },
          {
            model: Education,
            attributes: ['school', 'courses'],                        
          },
          {
            model: Networks,
            attributes: ['network', 'link'],                        
          },
          {
            model: Hobbies,
            attributes: ['id', 'hobbie'],                        
          },
        ]
      })
      return resultado
    }catch (err) {
      throw new Error ('No existe el usuario');
    }
  }

  //Modelo para eliminar un usuario
  deleteUser = async (id) => {
    try {
        await User.destroy({
            where: { id : id}
        })
        return true;
      } catch (err){
        throw new Error ('No se pudo eliminar el usuario seleccionado')
    }
  }

  //Modelo para añadir un conocimiento
  addKnowledges = async (id, array) => {
    try {
      array.Knowledges.forEach( async element => {
        await Knowledge.findOrCreate({
          where: {
              knowledge: element.knowledge, 
              id_user: id
          }
      })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar el conocimiento ')
    }
  }

  //Modelo para validar conocimiento
  validateKnowledge = async (id) => {
    try {
      let exist = await Knowledges.findOne({ where: { id: id } })
      if(!exist){
        throw new Error ('No se pudo validar el conocimiento')
      } else {
        exist.validate++;
        exist.save();
        return true
      }
    } catch (error) {
      throw new Error ('No existe el conocimiento')
    }
  }

  //Modelo para añadir una habilidad
  addSkills = async (id, array) => {
    try {
      array.Skills.forEach( async element => {
        await Skill.findOrCreate({
          where: {
              skill: element.conocimiento, 
              id_user: id
          }
      })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar la habilidad')
    }
  }

  //Modelo para validar una habilidad
  validateSkills = async (id) => {
    try {
      let exist = await Skill.findOne({ where: { id: id } })
      if(!exist){
        throw new Error ('No se pudo validar la habilidad')
      } else {
        exist.validate++;
        exist.save();
        return true
      }
    } catch (error) {
      throw new Error ('No existe la habilidad')
    }
  }

  //Modelo para añadir la educación
  addEducation = async (id, array) => {
    try {
      array.Education.forEach( async element => {
        await Educations.findOrCreate({
          where: {
              education: element.education, 
              courses: element.courses,
              id_user: id
          }
      })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar la educación')
    }
  }

  validateEducation = async (id) => {
    try {
      let exist = await Educations.findOne({ where: { id: id } })
      if(!exist){
        throw new Error ('No se pudo validar la educación')
      } else {
        exist.validate++;
        exist.save();
        return true
      }
    } catch (error) {
      throw new Error ('No existe la educación')
    }
  }
  //Modelo para añadir un idioma
  addLanguajes = async (id, array) => {
    try {
      array.Languajes.forEach( async element => {
        await Languajes.findOrCreate({
          where: {
              languaje: element.languaje, 
              level: element.level,
              id_user: id
          }
      })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar el idioma')
    }
  }

  validateLanguajes = async (id) => {
    try {
      let exist = await Languajes.findOne({ where: { id: id } })
      if(!exist){
        throw new Error ('No se pudo validar el idioma')
      } else {
        exist.validate++;
        exist.save();
        return true
      }
    } catch (error) {
      throw new Error ('No existe el idioma')
    }
  }

  //Modelo para añadir redes
  addNetworks= async (id, array) => {
    try {
      array.Networks.forEach( async element => {
        await Network.findOrCreate({
          where: {
              network: element.network, 
              link: element.link,
              id_user: id
          }
      })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar la red')
    }
  }

  validateNetworks= async (id) => {
    try {
      let exist = await Network.findOne({ where: { id: id } })
      if(!exist){
        throw new Error ('No se pudo validar la red')
      } else {
        exist.validate++;
        exist.save();
        return true
      }
    } catch (error) {
      throw new Error ('No existe la red')
    }
  }

  //Modelo para añadir un pasatiempo
  addHobbies= async (id, array) => {
    try {
      array.Hobbies.forEach( async element => {
        await Hobbie.findOrCreate({
          where: {
              hobbie: element.linkedin, 
              id_user: id
          }
      })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar el pasatiempo')
    }
  }
  
  validateHobbies= async (id) => {
    try {
      let exist = await Hobbie.findOne({ where: { id: id } })
      if(!exist){
        throw new Error ('No se pudo validar el pasatiempo')
      } else {
        exist.validate++;
        exist.save();
        return true
      }
    } catch (error) {
      throw new Error ('No existe el pasatiempo')
    }
  }

  //Modelo de comentarios 
  //Modelo para añadir un comentario
  addCommits= async (id, array) => {
    try {
      array.Commits.forEach( async element => {
        await Commit.findOrCreate({
          where: {
              commit: element.linkedin, 
              id_user: id
          }
      })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar el comentario')
    }
  }


  listCommit = async (id) => {
    try {
      let data = [id]
      let resultado = await sequelize.query(`SELECT dbo.users.id, dbo.users.name, dbo.users.surname, dbo.friends.accepted FROM dbo.friends INNER JOIN dbo.users ON friend_id = users.id WHERE accepted = 'false' AND users_id = ? `,
      {replacements : data, type : sequelize.QueryTypes.SELECT})
    return resultado
    } catch (error) {
      throw new Error ('No se pudo agregar la solicitud')
    }

  }

  //Modelo de amigo
  //Modelo para añadir un amigo
  addFriends= async (id, array) => {
    try {
      array.Friends.forEach( async element => {
        await Friend.findOrCreate({
          where: {
              friend: element.friend, 
              id_user: id
          }
      })
      });
    return true
    } catch (error) {
      throw new Error ('No se pudo agregar el contacto')
    }
  }

  //Modelo para solicitar amistad
  requestFriend = async (Friend, friend_id) => {
    try {
        await Friend.findOrCreate({
          where: {
            friend: friend_id,
            user_id: id
          }
        })
    return true
    } catch (error) {
      throw new Error ('No se pudo enviar  la solicitud')
    }
  }

    //Modelo para aceptar solicitud de amistad
  acceptedRequest = async (user_id, friend) => {
    try {
      let accepted = await Friend.findOne({where: {id: user_id, friend_id: friend.id}})
      if(accepted != null)
      {
        await Friend.update({
          accepted: true,
        }, 
          {where: {id: user_id, friend_id: friend.id}})
        return true;
      }
    return true
    } catch (error) {
      throw new Error ('No se pudo aceptar la solicitud')
    }
  }

  //Listado de amigos, comentarios y solicitudes
  listFriend = async (id) => {
    try {
      let data = [id]
      let resultado = await sequelize.query(`SELECT dbo.users.id, dbo.users.name, dbo.users.surname, dbo.friends.accepted FROM dbo.friends INNER JOIN dbo.users ON friend_id = users.id WHERE accepted = 'true' AND users_id = ? `,
      {replacements : data, type : sequelize.QueryTypes.SELECT})
    return resultado
    } catch (error) {
      throw new Error ('No se pudo agregar la solicitud')
    }
  }

  listRequest = async (id) => {
    try {
      let data = [id]
      let resultado = await sequelize.query(`SELECT dbo.users.id, dbo.users.name, dbo.users.surname, dbo.friends.accepted FROM dbo.friends INNER JOIN dbo.users ON friend_id = users.id WHERE accepted = 'false' AND users_id = ? `,
      {replacements : data, type : sequelize.QueryTypes.SELECT})
    return resultado
    } catch (error) {
      throw new Error ('No se pudo agregar la solicitud')
    }

  }