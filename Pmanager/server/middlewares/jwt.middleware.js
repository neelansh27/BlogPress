const jwt = require("jsonwebtoken");

function isAuthenticated(req,res,next) {
  const token = req.headers.token;
  if (!token){
    return res.status(400).json({err:"Token Verification Failed"});
  }
  const decoded = jwt.verify(token,process.env.SECRET)
  if (!decoded){
    return res.status(400).json({err: "Invalid Token"})
  }
  req.user=decoded;
  next();
}

module.exports = isAuthenticated;
