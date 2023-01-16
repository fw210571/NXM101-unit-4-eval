const express = require("express") ;
const { PostModel } = require("../models/postModel") ;

const  postRoute = express.Router() ;


//getting all the posts ;
postRoute.get("/" , async (req , res )=>{
    const query = req.query ;
    //{"device" : query}
    try{
        const user = await PostModel.find({query}) ;
        res.send( user ) ;
    }catch(err){
         res.send({"msg" : `Error from posts request ${err}` })
    }
    // res.send( {"msg" : "Your posts"} ) ;
}) ;


//Creating post 
postRoute.post("/create" , async (req , res )=>{
    const payload = req.body ;
 
    try{
        const post = new PostModel(payload) ;
        await post.save() ;

        res.send( {"msg" : `Post uploaded/created` } ) ;
    }catch(err){
         res.send({"msg" : `Error from Creating new post ${err}` })
    }
   
}) ;


//Updating the post 
postRoute.patch( "/update/:id" , async (req , res)=>{

   const payload = req.body ;
   const ID = req.params.id ;
   const post = await PostModel.find({"_id":ID}) ;
   const userID_by_post = post.userID     ;
   const userID_by_auth = req.body.userID ; 
  
   //if( userID_by_post == userID_by_auth ){

    try{
        await PostModel.findByIdAndUpdate({"_id":ID} , payload ) ;
        res.send(  {"msg" : `Post has been updated` })
    }catch(err){
        res.send( {"msg" : `Error from Creating new post ${err}` }  )
    }


   //}

} )


//deleting the post 
postRoute.delete( "/delete/:id" , async (req , res)=>{

  
    const ID = req.params.id ;
    const post = await PostModel.find({"_id":ID}) ;
    const userID_by_post = post.userID     ;
    const userID_by_auth = req.body.userID ; 
   
    //if( userID_by_post == userID_by_auth ){
 
     try{
         await PostModel.findByIdAndDelete({"_id":ID} ) ;
         res.send(  {"msg" : `Post has been Delete` })
     }catch(err){
         res.send( {"msg" : `Error from Deleting the post ${err}` }  )
     }
 
 
    //}
 
 } )




module.exports = { postRoute } ;