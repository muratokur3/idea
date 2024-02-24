const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.cookies.teknoToken; // Cookie'den tokeni al
     console.log("cooki geldi", token);
    if (!token) {
        return res.status(401).json("You need to login");
    } 
   
    try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Tokeni doğrula
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send("Token süresi doldu");
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).send("Geçersiz token");
    } else {
      return res.status(401).send("Yetkisiz erişim");
    }
  }
};


