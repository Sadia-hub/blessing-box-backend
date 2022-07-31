const projects = require("../models/project")

const addProject = async (req, res) =>{
try{
    const project = await projects.create(req.body)
    res.status(200).json(project)
    
}
catch(err){
    res.status(500).json({msg:err.message})
}
}

const getProjectsByNgoId = async (req, res) =>{
    try{
        const { ngoId } = req.params
        
        const ngoProjects = await projects.findAll({
            where:{
                ngoId
            }
        });

         res.status(200).json(ngoProjects)
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
}

const getProjectById = async (req,res) =>{
    try{
        const { id } = req.params
        console.log(id)
        const project = await projects.findByPk(id)
        if(project){
            return res.status(200).json(project)
        }
        return res.status(404).json({msg:"Project with id "+id+" does not exist"})

    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
}

module.exports = {
    addProject,
    getProjectsByNgoId,
    getProjectById
}