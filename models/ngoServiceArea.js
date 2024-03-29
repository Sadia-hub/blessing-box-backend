const {Sequlize, DataTypes} = require("sequelize")

const ngo = require("./ngo")
const serviceArea = require("./serviceAreas")

const sequelize = require("../db")

const NgoServiceArea = sequelize.define('NgoServiceArea', {
    ngoId: {
      type: DataTypes.INTEGER,
      references: {
        model: ngo, // 'Movies' would also work
        key: 'id'
      }
    },
    serviceAreaId: {
      type: DataTypes.INTEGER,
      references: {
        model: serviceArea, // 'Actors' would also work
        key: 'id'
      }
    }
  },{
    freezeTableName:true,
    timestamps:false
});

  module.exports = NgoServiceArea
  