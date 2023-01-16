const jwt = require("jsonwebtoken") ;
require("dotenv").config() ;

const Autherization = (req , res , next )=>{
       
    const token = req.headers.authorization ;
   

    //cheching token is exist or not
    if( token ){
        //verifying token is correct or wrong
        const decoded = jwt.verify(token , `${process.env.key}`) ;
        
        const userID = decoded.userID ;
        //giving userID in body for updating and deleting the posts 
        req.body.userID = userID ;
        console.log( userID );
        next() ;

    }else{
        res.send( {"msg" : "token is missing / you are not autherize"})
    }
} 

module.exports = { Autherization } ;