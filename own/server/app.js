const express=require('express');
const {default:mongoose}=require('mongoose');
const app=express()
require('dotenv').config()
const route=require("./routes/userAuth")
const cors=require('cors')
app.use(cors({origin:true}));
app.use(express.json());
//user auth routes
app.use('/api/users/',route);

// artist routes
const artistRoutes=require("./routes/artist")
app.use("/api/artists/",artistRoutes)
//album routes
const albumRoutes=require("./routes/albums")
app.use("/api/albums/",albumRoutes)
//songs album routes
const songRoutes=require("./routes/songs")
app.use("/api/songs/",songRoutes)



app.get('/',(req,res)=>{
    res.send("hello")
})

mongoose.connect(process.env.DB_STRING).then(()=>{
    console.log("db connected");
}).catch((err)=>{
    console.log(err);
})

app.listen(4000,()=>{
    console.log("port running in 4000");
})