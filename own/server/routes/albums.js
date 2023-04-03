const album = require("../models/album");

const router = require("express").Router();

router.post("/save", async (req, res) => {
    const newAlbum = album({
      name: req.body.name,
      imageURL: req.body.imageURL,     
    });
    try {
      const savedAlbum = await newAlbum.save();
      res.status(200).send({ album: savedAlbum });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  });


  router.get("/getOne/:id",async(req,res)=>{
    const filter={_id:req.params.id};
    const data=await album.findOne(filter)
    if(data){
        return res.status(200).send({ album: data });
    } else{
        return res.status(400).send({ success: false, msg: "data not found" });
    }
})
router.get("/getAll", async (req, res) => {
    const data =await album.find();
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
      const result = await album.findOneAndUpdate(
        filter,
        {
          name: req.body.name,
          imageURL: req.body.imageURL,
        },
        options
      );
      res.status(200).send({ album: result });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  });
  


router.delete("/delete/:id",async (req,res)=>{
    const filter={_id:req.params.id};
    const result= await  album.deleteOne(filter);
    if(result){
        return res.status(200).send({success:true, msg:"data deleted" });
    } else{
        return res.status(400).send({ success: false, msg:"data not found" });
    }
})


module.exports = router;
