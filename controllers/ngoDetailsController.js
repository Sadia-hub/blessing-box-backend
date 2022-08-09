const ngoDetails = require('../models/ngoDetails');
const ngo = require('../models/ngo');


const addDetails = async(req, res) => {

    try{
        const {ngoId} = req.body;

        const check = ngoDetails.findAll({
            where:{
                ngoId
            }
        })
        if(!check){
            return res.status(401).json({msg:"Sorry, you have already registered data"})
        }
        const details = await ngoDetails.create(req.body);
       
        res.status(200).json(details);
    }
    catch(err){
        res.status(500).json({msg:err})
    }

    
}


const getAllData = async(req, res) => {
    const {id} = req.params;
    try{
        const food = await Information.findAll({ include: {model: ngo, required: true, where:{serviceType : "food"}},})
        const education = await Information.findAll({ include: {model: ngo, required: true, where:{serviceType : "education"}},})
        const orphange = await Information.findAll({ include: {model: ngo, required: true, where:{serviceType : "orphange"}},})
        res.status(200).json({orphange, food, education});   
    }
    catch(err){

    }
}

module.exports = {addDetails, getAllData}