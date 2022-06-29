const ngos = require("../models/ngo")

const addNgo = async (req, res) =>{
    try{

        const {userId} = req.body

        const checkNgo = ngos.findAll({
            where:userId
        })

        if(checkNgo){
            return res.status(401).json({msg:"Sorry, you already have one NGO"})
        }

        const ngo = await ngos.create(req.body)
        res.status(200).json(ngo)
       
    }
    catch(err){
        res.status(500).json({msg:err.message})
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
            if(status == 0){
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
        const allNgos = await ngos.findAll({
            where:{
                status:status
            }
        })

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
    approveNGO
}