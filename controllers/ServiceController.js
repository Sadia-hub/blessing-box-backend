const sequelize = require("../db")


const getServices = async (req, res) =>{

    try{
        const services = await sequelize.models.services.findAll()
        console.log("services",services)
         res.json(services)
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
   
   
}

const addService=(req, res)=>{}


module.exports = {
    addService,
    getServices
}
