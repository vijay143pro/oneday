const express=require('express')
const route=express.Router()
const admin=require('../config/firebase.config');
const users=require('../models/users')
route.use("/login",async(req,res)=>{
    if(!req.headers.authorization){
        return res.status(500).send({message:"invalid"})
    }
    const token=req.headers.authorization.split(" ")[1];
   try{
        const decode=await admin.auth().verifyIdToken(token)
        if(!decode){
            return res.status(505).json({message:"Un Authorized"}) 
        }
        else{
            const userExists=await users.findOne({"user_id":decode.user_id})
            if(!userExists){
                newUserData(decode,req,res);
            }else{
                updateNewUser(decode,req,res)
            }
        }
   }
   catch(err){
    return res.status(505).json({message:err})
   }
})

const newUserData=async (decode,req,res)=>{
    const newUser=new users({
            name:decode.name,
            email:decode.email,
            imgURL:decode.picture,
            user_id:decode.user_id,
            email_verified:decode.email_verified,
            role:"member",
            auth_time:decode.auth_time
    })
    try{
    const savedUser=await newUser.save();
    res.status(200).send({users:savedUser})
    }catch(err){
            res.status(400).send({success:false,message:err})
    }
}
//upadte New users
const updateNewUser=async(decode,req,res)=>{
        const filter={user_id:decode.user_id};

        const options={
            upsert:true,
            new:true
        };
        try{
                const result=await users.findOneAndUpdate(
                    filter,{auth_time:decode.auth_time},  
                    options
                )
                res.status(200).send({users:result})
        }catch(err){
            res.status(400).send({success:false,message:err})
        }
}
route.get("/getUsers", async (req, res) => {
    const options = {
      // sort returned documents in ascending order
      
      // Include only the following
      // projection : {}
    };
  
    const cursor = await users.find();
    if (cursor) {
      res.status(200).send({ success: true, data: cursor });
    } else {
      res.status(200).send({ success: true, msg: "No Data Found" });
    }
  });
  

module.exports=route