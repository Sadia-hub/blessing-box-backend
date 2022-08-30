const {DataTypes} = require("sequelize")

const sequelize = require("../db")

const Project = sequelize.define("projects",{

    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement:true
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
    },
    amountRecieved:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:0
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:0
    },

},{
    freezeTableName: true,
    timestamps: false
})

module.exports = Project