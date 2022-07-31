const {Sequlize, DataTypes} = require("sequelize")
const sequelize = require("../db")

const Users = sequelize.define("users",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
        
    },
    isVerified:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contact:{
        type:DataTypes.STRING,
        allowNull:false
    },
    designation:{
        type:DataTypes.STRING,
        allowNull:false
    },
    type:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:"donor"
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    }},{
    freezeTableName: true,
    timestamps: false
});

module.exports = Users