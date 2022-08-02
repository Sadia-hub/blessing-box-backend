
const Sequlize = require("sequelize")

const sequelize = new Sequlize("blessing","root","",{
    dialect:"mysql",
    host:"localhost"
})

module.exports = sequelize