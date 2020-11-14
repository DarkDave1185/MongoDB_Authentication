const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No Valid Token Received, Authorization Denied" });

    const verified = jwt.verify(token, process.env.JWT_BASE);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token Verification Failed, Authorization Denied" });
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
