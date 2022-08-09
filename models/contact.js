const {Sequlize, DataTypes} = require("sequelize")
const sequelize = require("../db")
const Contact = sequelize.define("contact",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    message:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    responded:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:false

    }
   
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = Contact;