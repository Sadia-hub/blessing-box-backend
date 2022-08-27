const Proof = require("../models/proof");
const Project = require("../models/project")

const addProof = async (req, res, next) =>{
    try{
        const {body} = req;
        console.log("proof",body)
        const instance = await Proof.create(body)
        res.status(200).json({success:true, instance})
    }
    catch(err){
        res.status(500).json({success:false, msg:err.message})
    }
}

const getProofByProject = async (req,res) =>{
    try{
        
        const projects = await Project.findAll({ include: {model:Proof, required:true }})
        res.status(200).json({success:true, projects})
    }
    catch(err){
        res.status(500).json({success:false, msg:err.message})
    }
}


module.exports = {
    addProof,
    getProofByProject
}