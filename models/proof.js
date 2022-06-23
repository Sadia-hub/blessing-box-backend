const {DataTypes} = require("sequelize")

const sequelize = require("../db")

const Proof = sequelize.define("proofs",{

    id:{
        type:DataTypes.INTEGER, 
        autoIncremement:true,
        primaryKey:true,
        allowNull:false
    },
    document:{
        type:DataTypes.STRING,
        allowNull:false,
    }

},{
    freezeTableName: true,
    timestamps: false
})

module.exports = Proof