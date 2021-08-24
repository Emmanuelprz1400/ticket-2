const {DataTypes, Model} = require('sequelize')
const sequelize = require('./connection')

//Definiendo el modelo de estudios  
const Education = sequelize.define('education', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    school : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    courses : {
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