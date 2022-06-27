const {Sequlize, DataTypes} = require("sequelize")

const ngo = require("./ngo")
const service = require("./services")

const sequelize = require("../db")

const NgoService = sequelize.define('ngoService', {
  ngoId: {
    type: DataTypes.INTEGER,
    references: {
      model: ngo, // 'Movies' would also work
      key: 'id'
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
  