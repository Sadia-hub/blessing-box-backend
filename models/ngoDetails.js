const {Sequlize, DataTypes} = require("sequelize")
const sequelize = require("../db")
const NgoDetails = sequelize.define("NgoDetails",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    about_us:{
        type:DataTypes.TEXT,
        allowNull:false,
        
    },
    services:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    projects:{
        type:DataTypes.TEXT,
        allowNull:true
    }},{
    freezeTableName: true,
    timestamps: false
});

module.exports = NgoDetails;