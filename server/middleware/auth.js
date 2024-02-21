const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json("You need to login");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded);
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json("You need to login");
    }
};