const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.cookies.auth_token; // Cookie'den tokeni al
  if (!token) {
    return res.status(401).json("You need to login");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Tokeni doğrula
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send("Oturumunuzun süresi doldu.  Lütfen tekrar giriş yapın.");
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).send("Geçersiz bağlantı. Lütfen tekrar giriş yapın.");
    } else {
      return res.status(401).send("Yetkisiz erişim farkettik. Lütfen tekrar giriş yapın.");
    }
  }
};
