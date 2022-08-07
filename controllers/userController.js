const users = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const sendMail = require("../mail");

const addUser =  (req, res, next) =>{ 
        const {body} = req;
        const {password} = body

        bcrypt.hash(password, 5, async function(err, hash) {
            // returns hash
            if(!err){
                
                const {email, name, contact, designation, address, type} = body
                
                try{
                 const  user = await users.create({email, name, contact, designation, address, type,password:hash})
                    if(user){
                     
                            const info = await sendMail(email, user.id)
                            console.log(info)  
                            res.status(200).json({user, msg:"Thank you for registration! Kindly check your email for confirmation of your account"})                
                    }
                     
                }
                catch(err){
                    res.status(500).json({msg:err})
                }       
            }
            else{
                res.status(500).json({msg:err})  
            }      
            });
}

//update user
const updateUser = async(req, res, next) =>{
    const {id} = req.params;
    console.log(id);    
    const {password, name, contact, designation,  address} = req.body
    const user = await users.findByPk(id);
  
            bcrypt.hash(password, 5, async function(err, hash) {
                try{
                    if(user) {
                await users.update( { name, contact, designation, password : hash, address}  , {
                    where: {
                        id
                      }
                    });
                    res.status(200).json({msg: "update user"})   
                }
                if(!user) {
                    res.status(400).json({msg: "user Id is not registered"})
                }
                } 
            catch(err){
                res.status(500).json({msg: err})
            }
        })
        }

//change Password
const changePassword = async(req, res) =>{
    const {password} = req.body;
    const {id} = req.params;
    console.log(id);   
    const user = await users.findByPk(id);
    bcrypt.compare(password,user.password, (err, validated)=>{
        if(validated){
            return res.status(200).json("Old Password is same")  
        }
        else
        {
            return res.status(401).json("Old password is wrong")
        }
    })

}

//delete user
const deleteUser = async (req, res, next) =>{
    const {id} = req.params;
    console.log("Id is" + id);
    const user = await users.findByPk(id);
    try{
        if(user) {
        const user =  await users.destroy({
            where: {
                id
              }
        });
        console.log("In users"+user);
        res.status(200).json("user deleted");
    }
        if(!user) {
        res.status(400).json({msg: 'user Id is not registered'})  
        }
    }
    catch(err){
        res.status(500).json({msg: err})
    } 
}

const verifyUser = async(req, res, next) =>{
    const {id} = req.params
    try{
        const user = await users.update({ isVerified: true }, {
            where: {
              id
            }
          });

        if(user[0]==1){
            return res.status(200).send("Congratulations, you are verified!")
        }
        res.status(500).send("Something went wrong. Try again")
    }
    catch(err){
        res.status(500).json(err)
    }   
}

const getUser = async (req, res, next) =>{
    try{
        const {email, password} = req.body
        const user = await users.findOne({
            where: {
                email
              }
        });

        if(user && user.isVerified){
            console.log(user)      
            bcrypt.compare(password,user.password, (err, validated)=>{
                if(validated){
                    const token = jwt.sign({username:email},process.env.SECRET_KEY,{expiresIn:60*30})
                   
                    return res.status(200).json({user, token})
                    
                }
                else
                {
                    return res.status(401).json("Either Username or password is wrong")
                }
            })
            
        }
        else{
            res.status(401).json("This email is not registered")
        }

    }
    catch(err){
        res.json({msg:err.message})
    }

}


const getAllUsers =async(req, res, next) => {
    try{
        const all_Users = await users.findAll();
        if(all_Users){
          return  res.status(200).json(all_Users);
        }
       else{
            return  res.status(200).json('Users does not exists');  
        }
    }
    catch(err){
        res.status(500).json(err);
    }
}


//get User By ID 
const getUserByID = async(req, res) => {
    const {id} = req.params
    try{
        const user = await users.findByPk(id);
        return res.status(200).json(user);
    }
    catch(e){
        return res.status(500).json({msg:err});  
    }
}

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getUser,
    verifyUser,
    getAllUsers,
    getUserByID,
    changePassword
}

