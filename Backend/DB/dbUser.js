const {DataTypes, Model, Sequelize} = require('sequelize');
const sequelize = require('./connection');
const Friends = require('./dbFriends')
const Commits = require('./dbCommits')
const Knowledge = require('./dbKnowledge')
const Skills = require('./dbSkills');
const Education = require('./dbEducation');
const Languajes = require('./dbLanguajes');
const Networks = require('./dbNetworks');
const Hobbies = require('./dbHobbies');

//Definiendo el modelo usuarios 
const User = sequelize.define('users', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        args: true,
        msg: 'Ya existe una cuenta con este correo'
      }
    },
    pass: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
  },{
    timestamps: true
})

//Llaves fóraneas 
User.hasMany(Friends, {
  foreignKey: {
    nombre: 'id_friend',
    type: DataTypes.INTEGER,
    allowNull: false
  },
  onDelete: 'CASCADE'
})

User.hasMany(Commits, {
  foreignKey: {
    nombre: 'id_friend',
    type: DataTypes.INTEGER,
    allowNull: false
  },
  onDelete: 'CASCADE'
})

User.hasMany(Knowledge, {
  foreignKey: {
    nombre: 'id_user',
    type: DataTypes.INTEGER,
    allowNull: false
  },
  onDelete: 'CASCADE'
})

User.hasMany(Skills, {
  foreignKey: {
    nombre: 'id_user',
    type: DataTypes.INTEGER,
    allowNull: false
  },
  onDelete: 'CASCADE'
})

User.hasMany(Education, {
  foreignKey: {
    nombre: 'id_user',
    type: DataTypes.INTEGER,
    allowNull: false
  },
  onDelete: 'CASCADE'
})

User.hasMany(Languajes, {
  foreignKey: {
    nombre: 'id_user',
    type: DataTypes.INTEGER,
    allowNull: false
  },
  onDelete: 'CASCADE'
})

User.hasMany(Networks, {
  foreignKey: {
    nombre: 'id_user',
    type: DataTypes.INTEGER,
    allowNull: false
  },
  onDelete: 'CASCADE'
})

User.hasMany(Hobbies, {
  foreignKey: {
    nombre: 'id_user',
    type: DataTypes.INTEGER,
    allowNull: false
  },
  onDelete: 'CASCADE'
})