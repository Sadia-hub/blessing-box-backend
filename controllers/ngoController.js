const ngos = require("../models/ngo")
const users = require("../models/users")
const addNgo = async (req, res) =>{
   
    try{
        const {userId} = req.body
        console.log(userId)
        const checkNgo = ngos.findAll({
            where:{
                userId
            }
        })
        if(!checkNgo){
            return res.status(401).json({msg:"Sorry, you already have one NGO"})
        }
        const ngo = await ngos.create(req.body)
        res.status(200).json(ngo)
       
    }
    catch(err){
        res.status(500).json({msg:err.message})
        console.log("error is"+err)
    }
    
}

//returns approved NGO by ID
const getNgo = async (req, res) =>{
    try{

        const {id} = req.params

        const ngo = await ngos.findByPk(id)
        if(ngo){
            if(ngo.status == "pending"){
                return res.status(401).json({msg:"Approval of your NGO is pending, it might take a few days."})
            }
            if(ngo.status == "disproved"){
                return res.status(401).json({msg:"Requested NGO is disproved."})
            }
            return res.status(200).json(ngo)
        }

        res.status(400).json({msg:"NGO not found"})
       
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
}

const approveNGO = async (req, res, next) =>{
    try{
        const {id, status} = req.params
        const ngo = await ngos.findByPk(id)
        const userID = ngo.dataValues.userId;
        console.log("In approve"+ngo.dataValues.userId)
        if(ngo){

            const ngoStatus = (status == 1) ? "approved" :"disproved"
            console.log(ngoStatus)
            console.log(status)
            const ngo = await ngos.update({  status :ngoStatus }, {
                where: {
                  id
                }
              });
            if(status == 0){
                
                return res.status(200).json({msg:"Sorry, requested NGO cannot be approved", ngo})
            }
            if(status == 1){
                await users.update({ type: "Ngo"}, {  
                    where: {
                   Id : userID
                }
            })
                return res.status(200).json({msg:"Congratulation, your NGO has been approved", ngo})
            }
            return res.status(400).json({msg:"Please provide correct flag for ngo status", ngo})
        }

        res.status(400).json({msg:"NGO not found"})
        
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
}

//return all approved NGOs
const getNgos = async (req, res) =>{
    try{
        
        const {status} = req.query
       
        console.log("all")
       
        if(status==undefined){
            status = "approved"
        }
        // console.log("Status is"+ status)
        const allNgos = await ngos.findAll(
            {
            where:{
                status:status
            }
        }
        )
            console.log("In all NGOS"+ allNgos);
        if(allNgos){
            return res.status(200).json(allNgos);
        }
        else 
            res.status(200).json({msg:"NGOs doesnot exist"});

    }
    catch(err){
        res.status(500).json(err)
    }
    
}

//get NGOs by servicetype
const getNGOByService = async (req, res) =>{
    try{
    const {service} = req.params
        console.log(service)
    const ngo = await ngos.findAll({ where: {serviceType: service} })
    if(ngo){
        return res.status(200).json(ngo)
    }

    res.status(400).json({msg:"NGO not found"})
}
catch(err){
    res.status(500).json({msg:err.message})
}   
}


const updateNgo = (req, res) =>{
    res.json({msg:"update ngo"})
}

const deleteNgo = (req, res) =>{
    res.json({msg:"delete ngo"})
}

module.exports = {
    addNgo,
    getNgo,
    getNgos,
    updateNgo,
    deleteNgo,
    approveNGO,
    getNGOByService
}