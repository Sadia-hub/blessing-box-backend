const {DataTypes} = require("sequelize")

const sequelize = require("../db")

const Services = sequelize.define("services",{

    id:{
        type:DataTypes.INTEGER, 
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    service:{
        type:DataTypes.STRING,
        allowNull:false,
        default:"donor"
    }

},{
    freezeTableName: true,
    timestamps: false
})

module.exports = Services;