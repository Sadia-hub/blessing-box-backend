const sequelize = require("../db")


const getServices = async (req, res) =>{
   const services = await sequelize.models.services.findAll()
   console.log("services",services)
    res.json(services)
   
}

const addService=(req, res)=>{}


module.exports = {
    addService,
    getServices
}
