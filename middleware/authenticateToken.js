const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authentication"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (req, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

exports.authenticateToken = authenticateToken;
