const {DataTypes, Model} = require('sequelize')
const sequelize = require('./connection')

//Definir mi Modelo con que voy a trabajar
const Languajes = sequelize.define('languajes', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    languaje : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    level : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false        
    },
  },{
    timestamps: false

})