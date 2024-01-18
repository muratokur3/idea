const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Tüm kullanıcılar");
    });


    module.exports = router;