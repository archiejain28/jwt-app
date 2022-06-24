const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken =  (req,res,next) => {
    
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    
    if(!token){
        return res.status(403).send("A token is required");
    }
    
    try{
        console.log(token);
        const decode =  jwt.verify(token, process.env.TOKENKEY);
        req.user = decode
        console.log(req.user);
    }
    catch(err){
        res.send('Token invalid')
        return;
    }
    next();
}

module.exports = verifyToken;