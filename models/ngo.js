const {Sequelize, DataTypes} = require("sequelize")

const sequelize = require("../db")


const NGO = sequelize.define("ngos",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement:true
    },
    ngoEmail:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
        
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userEmail:{
        type:DataTypes.STRING,
        allowNull:false  
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:"pending"
    },
    year:{
        type:DataTypes.INTEGER,
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
    serviceType:{
        type:DataTypes.STRING,
        allowNull:false
    },
    serviceArea:{
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
