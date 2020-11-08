const router = require("express").Router();

//CHECK POSTMAN FOR WORKING ROUTE CONNECTION
router.get("/test", (req, res) => {
  res.send("WORKING ROUTER CONNECTION");
});

//register user
router.post("/register", async (req, res) => {
  const { email, password, passwordCheck, displayName } = req.body;
  //validate user info
  if (!email || !password || !passwordCheck)
    return res.status(400).json({ msg: "Missing Field Required." });
  if (password.length < 6)
    return res.status(400).json({ msg: "Password Must Be 6 Characters Long." });
});

module.exports = router;
