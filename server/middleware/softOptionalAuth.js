const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.auth_token; // Cookie'den tokeni al

  // Token yoksa veya doğrulanamazsa, request'i kullanıcı bilgisi olmadan devam ettir
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Tokeni doğrula
    req.user = decoded; // Doğrulanmış kullanıcı bilgisini request'e ekle
  } catch (error) {
    // Token geçersizse bile, hata döndürmek yerine isteği devam ettir
    console.log("Token geçersiz veya süresi doldu, misafir olarak devam ediliyor.");
  }
  
  next(); // Middleware zincirindeki sonraki adıma geç
};
