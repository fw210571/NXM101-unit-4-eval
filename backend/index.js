const express = require("express") ;
require("dotenv").config() ;
const {connection} = require("./configs/db") ;
const {userRoute} = require("./routes/userRoute") ;
const { Autherization } = require("./middlewares/authMiddleware") ;
const { postRoute } = require("./routes/postRoute") ;
const app = express() ;
app.use(express.json()) ;

app.get("/" , (req , res)=>{
    res.send("Welcome")
})

app.use("/users" , userRoute) ;
app.use( Autherization ) ;
app.use("/posts" , postRoute) ; 


app.listen( process.env.port , async ()=>{
    try{
        await connection ;
        console.log("Connected to <<< DB >>>") ;

    }catch(err){
        console.log("unable to connect(DB)")
    }
    console.log(`server running at port <<<< ${process.env.port} >>>>`) ;
})