const {DataTypes} = require("sequelize")

const sequelize = require("../db")

const Donation= sequelize.define("donations",{

    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement:true
    },
    donation:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    }
},{
    freezeTableName: true,
    timestamps: false
})

module.exports = Donation