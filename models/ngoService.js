const {Sequlize, DataTypes} = require("sequelize")

const ngo = require("./ngo")
const service = require("./services")

const sequelize = require("../db")

const NgoService = sequelize.define('NgoService', {
    ngoEmail: {
      type: DataTypes.STRING,
      references: {
        model: ngo,
        key: 'email'
      }
    },
    serviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: service, 
        key: 'id'
      }
    }
  },{
    freezeTableName:true,
    timestamps:false
});

  module.exports = NgoService
  