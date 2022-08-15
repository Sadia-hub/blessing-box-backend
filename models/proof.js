const {DataTypes} = require("sequelize")

const sequelize = require("../db")

const proof = sequelize.define("proofs",{

    id:{
        type:DataTypes.INTEGER, 
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    document:{
        type:DataTypes.STRING
    }

},{
    freezeTableName: true,
    timestamps: false
})

module.exports = proof