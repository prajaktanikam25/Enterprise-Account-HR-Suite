const router = require("express").Router();
const jwt = require('jsonwebtoken');
const User = require("../model/userMaster.model");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/saveUser", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      mobile: req.body.mobile,
      role: req.body.role,
      email: req.body.email,
      userName: req.body.userName,
      password: hashedPass,
      department: req.body.department,
      organization: req.body.organization,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return res.status(400).send("User Name is Invalid.");
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).send("Password is Invalid.");
    }
    const name = user.fname + " " + user.lname
    const token = jwt.sign({ user }, 'secret_key');
    const role = user.role
    const userName = user.userName
    const organization = user.organization
    const department = user.department

    res.json({ name, userName, role, organization, department, token })
  } catch (err) {
    console.log(err)
  }
});

router.get('/protected', (req, res) => {
  // Verify JWT in request header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    // Access granted, return protected data
    res.json({ message: 'You are authorized to access this resource.' });
  });
});

module.exports = router;