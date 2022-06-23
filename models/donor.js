const {Sequlize, DataTypes} = require("sequelize")

const sequelize = require("../db")

const Donor = sequelize.define("donors",{
    userName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
    },
    isVerified:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        default:false
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
    address:{
        type:DataTypes.STRING,
        allowNull:false
    }},{
    freezeTableName: true,
    timestamps: false
});

module.exports = Donor