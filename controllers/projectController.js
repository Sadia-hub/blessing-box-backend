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

        res.status(200).json({ngoProjects, success:true})
 
    }
    catch(err){
        res.status(500).json({msg:err.message, success:false})
    }
}


const serverSentEvents = async(req, res) => { 
   
    var value = 1; 
    const { ngoId } = req.params;
    
    console.log("Value is ",  value)    
       res.set('Content-Type', "text/event-stream")
       res.set("Connection", "keep-alive")
       res.set("Cache-Control", "no-cache")
       res.set("Access-Control-Allow-Origin", "*")
       console.log('client connected to server')
      
       setInterval( async function(){  
        const ngoProjects = await projects.findAll({
            where:{
                ngoId
            }
        }); 
           res.status(200).write(`data: ${JSON.stringify(ngoProjects)}\n\n`)
       }, 1000);
   
   } ;

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
    getProjectById,
    serverSentEvents
}