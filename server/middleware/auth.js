const jwt = require("jsonwebtoken");

// const refreshTokens = (exp,user) => {
  
//   const now = Date.now(); // Şu anki zaman
//   const remainingTime = exp - now; // Kalan süre (milisaniye cinsinden)

//   const tokenDuration = 1000 * 60 * 2 ; // Token'ın toplam süresi 
//   const threshold = tokenDuration * 0.2; // %20'i

//   if (remainingTime < threshold) {
//     const payload = {
//     sub: user.sub,
//     username: user.username,
//     rol: user.rol,
//     exp: Math.floor(Date.now() / 1000) + 60 * 2,
//     issuer: "idea.com",
//   };
//     // Yeni bir token oluşturmak için sunucuya istek gönder
//     const refreshToken = jwt.sign(payload, process.env.SECRET_KEY);
//     res.cookie("teknoToken", refreshToken,{
//       httpOnly: true,
//       domain: "localhost",
//       path: "/",
//       session: true,
//       expires: new Date(Date.now() + 60 * 2 * 1000),
//       maxAge: 1000 * 60 * 2,
//     });
//   }
// };

module.exports = async (req, res, next) => {
  const token = req.cookies.teknoToken; // Cookie'den tokeni al
  console.log("cooki geldi", token);
  if (!token) {
    return res.status(401).json("You need to login");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Tokeni doğrula
    // const exp = decoded.exp; // Token'ın süresi dolma zamanı
    eq.user = decoded;
    // refreshTokens(exp, decoded);
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
