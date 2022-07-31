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
    serviceArea: {
      type: DataTypes.STRING,
      allowNull:false
    }
  },{
    freezeTableName:true,
    timestamps:false
});

  module.exports = NgoServiceArea
  