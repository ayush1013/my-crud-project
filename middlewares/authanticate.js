const jwt = require("jsonwebtoken");
require("dotenv").config();

const authanticate = (req,res,next)=>{
    const token = req.headers.authorization
    console.log(token)
    if(token){
        const decode = jwt.verify(token, process.env.key);
        if(decode){
            console.log(decode)
            const userID = decode.userID;
            req.body.userID = userID
            next();
        }else{
            res.send("Please Login")
        }
    }else{
        res.send("Please Login")
    }
}

module.exports = {
    authanticate
}