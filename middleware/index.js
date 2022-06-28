const jwt = require('jsonwebtoken');
const users = require('../models/users');

const hastoken = (req, res, next) => {
    try{
        const headerValue = req.headers.authorization.split(' ')[1]
        console.log('Token:', headerValue);
        const result = jwt.verify(headerValue, process.env.SECRET_KEY)
    if(result) {
      next()
    }
    else {
    return res.status(401).send({msg:'Unauthorized'})
    }  
}
    catch (err) {
        return res.status(401).send({msg:err})
    }
}
module.exports = {hastoken};