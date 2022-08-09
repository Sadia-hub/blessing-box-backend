const contact = require("../models/contact");
const replyMail =require("../replymail");
const sendQuery = async(req, res) => {
    try{
const{email, message} =req.body;
   const query = await contact.create({email, message})
   return res.status(200).json(query);
    }
    catch(err){
        return res.status(500).json({msg: err}); 
    }
}

//get All queries
const getAllQureies = async(req, res) =>{
    try{
    const messages = await contact.findAll({where: {responded: 0}});
    return res.status(200).json(messages);
    }
    catch(err){
        return res.status(500).json({msg: err});     
    }
}

//get query By ID
const getQueryById = async(req, res) =>{
    try{
        const {id} = req.params;
    const message = await contact.findAll({where: {id}});
    return res.status(200).json(message);
    }
    catch(err){
        return res.status(500).json({msg: err});     
    }
}

const sendReply =async(req, res) =>{
    try{
       const{id, email, reply} = req.body;
       const response =await replyMail(email, reply)
       const user = await contact.findByPk(id)
       if(user){
        await contact.update({responded: true},{ where: {id}}  );
       }
       return res.status(200).json({email, reply});      
    }
    catch(err){
        return res.status(500).json({msg: err});      
    }
}


module.exports = {sendQuery, getAllQureies, sendReply, getQueryById};

