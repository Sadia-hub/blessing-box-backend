const {DataTypes} = require("sequelize")

const sequelize = require("../db")

const ServiceAreas = sequelize.define("serviceAreas",{

    id:{
        type:DataTypes.INTEGER, 
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    area:{
        type:DataTypes.STRING,
        allowNull:false,
        default:"donor"
    }

},{
    freezeTableName: true,
    timestamps: false
})

module.exports = ServiceAreas