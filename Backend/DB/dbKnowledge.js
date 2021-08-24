const {DataTypes, Model, Sequelize} = require('sequelize')
const sequelize = require('./connection')

//Definiendo el modelo conocimientos  
const Knowledges = sequelize.define('knowledges', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    knowledge : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    validate : {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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