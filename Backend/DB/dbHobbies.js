const {DataTypes, Model} = require('sequelize')
const sequelize = require('./connection')

//Definiendo el modelo pasatiempos  
const Hobbies = sequelize.define('hobbies', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hobbie : {
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
