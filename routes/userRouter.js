const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register user
router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    //validate user info
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Missing Field Required." });
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password Must Be 6 Characters Long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Password Must Be Entered The Same Twice." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ msg: "Account Already Exists." });

    if (!displayName) displayName = email;

    //creates randomization of password
    const salt = await bcrypt.genSalt();
    //creates hash password
    const passwordHash = await bcrypt.hash(password, salt);
    console.log("BCRYPT P/W:", passwordHash);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//login user
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    //VALIDATE
    if (!email || !password)
      //console.log(email, password);
      return res.status(400).json({ msg: "Fields Needed Are Missing" });

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "No Account Found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_BASE);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
      },
    });
    console.log("TokenCode:", token);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
