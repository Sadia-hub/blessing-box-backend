const {DataTypes} = require("sequelize")

const sequelize = require("../db")

const Role = sequelize.define("roles",{

    role:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey: true
    }

},{
    freezeTableName: true,
    timestamps: false
})

module.exports = Role;

