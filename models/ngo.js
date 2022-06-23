const {Sequelize, DataTypes} = require("sequelize")

const sequelize = require("../db")


const NGO = sequelize.define("ngos",{
    id:{
        type:DataTypes.INTEGER, 
        autoIncremement:true,
        primaryKey:true,
        allowNull:false
    },
    username:{
        allowNull:false,
        type: DataTypes.STRING,
        unique: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    logo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        default:"pending"
    },
    year:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contact:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    founderName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    founderCNIC:{
        type:DataTypes.STRING,
        allowNull:false
    },
    founderContact:{
        type:DataTypes.STRING,
        allowNull:false
    },
    certificate:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    freezeTableName:true,
    timestamps:false
})



module.exports = NGO
