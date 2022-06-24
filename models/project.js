const {DataTypes} = require("sequelize")

const sequelize = require("../db")

const Project = sequelize.define("projects",{

    id:{
        type:DataTypes.INTEGER, 
        autoIncremement:true,
        primaryKey:true,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    imageurl:{
        type:DataTypes.STRING,
        allowNull:false
    },
    target:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    }

},{
    freezeTableName: true,
    timestamps: false
})

module.exports = Project