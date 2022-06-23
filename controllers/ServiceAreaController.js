const sequilize = require('../db');

const getServiceArea = async (req, res) => {
    const serviceArea = await sequilize.models.serviceAreas.findAll();
    if(serviceArea){
        res.json(serviceArea)
    }
    
}

module.exports = {getServiceArea};