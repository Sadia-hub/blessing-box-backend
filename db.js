
const Sequlize = require("sequelize")

const sequelize = new Sequlize("blessing","root","1234",{
    dialect:"mysql",
    host:"localhost"
})

module.exports = sequelize