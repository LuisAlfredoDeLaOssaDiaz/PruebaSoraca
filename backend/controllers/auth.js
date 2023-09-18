const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

function register(req, res) {
  const { name, id, password, active } = req.body;

  if (!id) res.status(400).send({ msg: "Mandatory id."});
  if (!password) res.status(400).send({ msg: "Mandatory password." });

  const user = new User({
    name,
    id: id.toLowerCase(),
    active,
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  user.save().then((userStorage) => {
    res.status(200).send(userStorage);
  }).catch((err) => {
    res.status(400).send({ msg: "Error al crear el usuario" });
  });
}

function login(req, res) {
  const { id, password } = req.body;

  if (!id) res.status(400).send({ msg: "Mandatory id."});
  if (!password) res.status(400).send({ msg: "Mandatory password." });

  const idLowerCase = id.toLowerCase();

  User.findOne({ id: idLowerCase }).then((userStore) => {
    
    bcrypt.compare(password, userStore.password, (bcryptError, check) => {
    if (bcryptError) {
        res.status(500).send({ msg: "Error server." });
    } else if (!check) {
        res.status(400).send({ msg: "Incorrect password." });
    } else if (!userStore.active) {
        res.status(401).send({ msg: "User not autorized or not active." });
    } else {
        res.status(200).send({
        access: jwt.createAccessToken(userStore),
        refresh: jwt.createRefreshToken(userStore),
        });
    }
    });
  }).catch((err) => {
    res.status(500).send({ msg: "Error server." });
  });;
}

function refreshAccessToken(req, res) {
  const { token } = req.body;

  if (!token) res.status(400).send({ msg: "Token required" });

  const { user_id } = jwt.decoded(token);

  User.findOne({ _id: user_id }).then((userStorage) => {
    res.status(200).send({ accessToken: jwt.createAccessToken(userStorage) });
  }).catch((err) => {
    res.status(500).send({ msg: "Error server" });
  });
}

module.exports = {
  register,
  login,
  refreshAccessToken,
};
