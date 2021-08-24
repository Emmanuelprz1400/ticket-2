const {DataTypes, Model} = require('sequelize')
const sequelize = require('./connection')

//Definiendo el modelo amigos  
const Friend = sequelize.define('friends', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    accepted : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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