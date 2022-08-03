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
                await users.update({ type: "ngo"}, {  
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
       
        if(!status){
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

//get All pending NGOs
const getPendingNGOs  =async(req, res) =>{
    try{
        const pending_ngo = await ngos.findAll({ where: {status: 'pending'} })
        if(pending_ngo){
            return res.status(200).json(pending_ngo)
        }
        res.status(400).json({msg:"No NGOs with pending Status"})
    }
    catch(err){
        res.status(500).json({msg:err.message})
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


//get Ngo By ID (All NGOs)

const getNgoByID = async(req, res) => {
    try{
        const {id} = req.params;
        const ngo = await ngos.findByPk(id)
        if(ngo){
            return res.status(200).json(ngo);
        }
        res.status(400).json({msg:"NGOs not found"})

    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
}

//update Ngo
const updateNgo = async(req, res) =>{
    const {id} = req.params;
    const ngo = await ngos.findByPk(id)
   try{
    if(ngo){
        const ngo = await ngos.update( req.body  , {
            where: {
                id
              }
            });
            res.status(200).json({msg: "update user"})
    }
    if(!ngo) {
        res.status(400).json({msg: "ngo Id is not registered"})
    }
}
catch(err){
    res.status(500).json({msg: err})
}
}

const deleteNgo = (req, res) =>{
    res.json({msg:"delete ngo"})
}

//user id is in NGO

const checkUserHasNgo = async(req, res) =>{
    const {id} = req.params;
    console.log("user id is",id)
    const ngo = await ngos.findAll({ where: {userId: id}}) ;
    try{
      
        if(ngo[0].dataValues.userId==id){
            return res.status(200).json(true)  
        }
        else if(ngo[0].dataValues.userId!=id)
            { 
                return res.status(400).json(false)
            
            }
    }
    catch(err){
        res.status(500).json(false)
    }

}

module.exports = {
    addNgo,
    getNgo,
    getNgos,
    updateNgo,
    deleteNgo,
    approveNGO,
    getNGOByService,
    getPendingNGOs,
    getNgoByID,
    checkUserHasNgo
}