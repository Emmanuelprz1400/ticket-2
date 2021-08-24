const {DataTypes, Model} = require('sequelize')
const sequelize = require('./connection')

//Definir mi Modelo con que voy a trabajar
const Networks = sequelize.define('networks', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    network : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    link : {
        type: DataTypes.STRING(100),
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