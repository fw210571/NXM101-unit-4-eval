const jwt  = require("jsonwebtoken") ;
const express = require("express") ;
const {UserModel} = require("../models/registerModel") ;
const userRoute = express.Router() ;
const bcrypt = require("bcrypt") ;
require("dotenv").config() ;

//Catching users data
userRoute.get( "/" , async (req , res)=>{
    // res.send( "welcome to users" ) ;
    try{
        const users =  await UserModel.find() ;
        res.send(users) ;
    }catch(err){
        res.send({"msg" : "error from catching users data"}) ;
    }
})


//registering the new user
userRoute.post( "/register" , async (req , res)=>{
    const { name , email , gender , password } = req.body ;
    
    const user = await UserModel.findOne({email}) ;
    //checking user is exist or not
    if(user){
        res.send({"msg" : "Please login you have already account"})
    }
    try{ 
        //encrypting the password 
        bcrypt.hash( password , 3 , async (err , password )=>{

           if( err){
            res.send({"msg" : "Error in encrypting the password"}) ;

           }else {
            //saving to DB
            const payload = new UserModel(  {name , email , gender , password } ) ;
            await payload.save() ;
            res.send({"msg" :   `${name} register successfully` }) ;
           }
        } )
            

    }catch{

    }
}) ;


//login the user 
userRoute.post("/login" , async (req , res )=>{
    
    const {email , password } = req.body ;
    //res.send( {"msg" : "Logged in successfully"} ) ;
    const user = await UserModel.findOne({email}) ;

    //user is exist or not
    if( user ){
        try{
            //checking both passwords ( entered by user and signed password ) by bcrypting it
            bcrypt.compare(password , user.password , async (err , result )=>{
                    if( result ) {

                    //giving token for Authentication 
                    const token = jwt.sign( {userID : user._id} , `${process.env.key}` )
                    res.send( {"msg" : "Logged in successfully" , "token" : token } )
                   }else {
                   
                        res.send({"msg" : "Password is Wrong"} ) ;
                      
                   }

            })


        }catch(err){
            res.send( {"msg" : "Error from login request"}  )
        }
    }else {
        res.send({"msg" : "User not Exist please register First"})
    }
   

})


module.exports ={ userRoute } ;