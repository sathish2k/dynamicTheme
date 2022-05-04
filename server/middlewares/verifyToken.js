const jwt = require("jsonwebtoken");
const VerifyToken = (req, res, next) => {
  const privateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
  const token = req.cookies["accessToken"];
  jwt.verify(token, privateKey, (err, tokenDetails) => {
    if (err){
      return res
        .status(403)
        .json({ error: true, message: "Invalid token" });
    }
    req.userId = tokenDetails._id;
    next();
  });
};

module.exports = VerifyToken;
