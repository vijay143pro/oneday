const router =require("express").Router();

const artist=require("../models/artist");

router.post("/save", async (req, res) => {
    const newArtist = artist({
      name: req.body.name,
      imageURL: req.body.imageURL,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
    });
    try {
      const savedArtist = await newArtist.save();
      res.status(200).send({ artist: savedArtist });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  });

router.get("/getOne/:id",async(req,res)=>{
        const filter={_id:req.params.id};
        const data=await artist.findOne(filter)
        if(data){
            return res.status(200).send({ artist: data });
        } else{
            return res.status(400).send({ success: false, msg: error });
        }
})

router.get("/getAll", async (req, res) => {
    const data =await artist.find();
    if(data){
        return res.status(200).send({success:true, artist: data });
    } else{
        return res.status(400).send({ success: false, msg: error });
    }
})



router.put("/update/:updateId", async (req, res) => {
    const filter = { _id: req.params.updateId };
    const options = {
      upsert: true,
      new: true,
    };
    try {
      const result = await artist.findOneAndUpdate(
        filter,
        {
          name: req.body.name,
          imageURL: req.body.imageURL,
          twitter: req.body.twitter,
          instagram: req.body.instagram,
        },
        options
      );
      res.status(200).send({ artist: result });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  });
  


router.delete("/delete/:id",async (req,res)=>{
    const filter={_id:req.params.id};
    const result= await  artist.deleteOne(filter);
    if(result){
        return res.status(200).send({success:true, msg:"data deleted" });
    } else{
        return res.status(400).send({ success: false, msg:"data not found" });
    }
})

  module.exports=router