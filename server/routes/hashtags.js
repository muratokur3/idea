const express =require("express");
const router= express.Router();

router.get("/",(req,res)=>{
    res.send("Tüm hashtagler");
})


module.exports=router;