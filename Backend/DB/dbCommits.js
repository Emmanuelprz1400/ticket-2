const {DataTypes, Model} = require('sequelize')
const sequelize = require('./connection')

//Definiendo el modelo comentarios 
const Commits = sequelize.define('commits', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    commit : {
        type: DataTypes.STRING(200),
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