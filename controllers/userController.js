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
                
                const {email, name, contact, designation, address} = body

                try{
                    user = await users.create({email, name, contact, designation, address, password:hash})

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

const updateUser = (req, res, next) =>{
    res.json({msg:"Update User"})
}

const deleteUser = (req, res, next) =>{
    res.json({msg:"delete user"})
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
                    return res.status(401).json({msg:"Either Username or password is wrong"})
                }
            })
            
        }
        else{
            res.status(401).json({msg:"This email is not registered"})
        }

    }
    catch(err){
        res.json({msg:err.message})
    }

}

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getUser,
    verifyUser
}

