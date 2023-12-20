const router = require("express").Router();
const User = require("../models/User");
const Roles = require("../models/Role");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//**register */
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  /**if username is already used */
  const duplicated = await User.findOne({ username });
  if (duplicated) {
    return res.status(400).send({ message: "Username is already used" });
  }

  /**hash the password */
  const saltRound = 15;
  const hashedPassword = await bcrypt.hashSync(password, saltRound);

  /** create and save new user to db*/
  const defaultRole = await Roles.findOne({ name: "user" }).exec();
  const newUser = new User({
    username,
    password: hashedPassword,
    roles: defaultRole._id,
  });
  await newUser.save();

  return res.status(200).send({
    message: `${username} is new user, created`,
  });
});

//**login */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  /**find user */
  const user = await User.findOne({ username }).lean();

  /**if no user */
  if (!user) {
    return res.status(400).send({ message: "This username is not exits" });
  }

  /**compare password */
  const validPassword = bcrypt.compareSync(password, user.password);

  /**if invalid password */
  if (!validPassword) {
    return res.status(400).send({ message: "Password is invalid" });
  }

  //**jwt init require */
  /**create accessToken */
  const accessToken = jwt.sign(
    { user: user.username, roles: user.roles },
    "secretKey"
  );
  /**create refreshToken */
  const refreshToken = jwt.sign({ id: user._id }, "secretKey");
  /**response with username,and accessToken */
  return res.status(200).send({
    message: "Login succeeded",
    username: user.username,
    accessToken,
    refreshToken,
  });
});

module.exports = router;
