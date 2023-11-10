const express = require("express");
const User = require("../schema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const getUserInfo = require("../lib/getUserInfo");

const router = express.Router();

router.post("/", async function (req, res, next) {
  const { email, password } = req.body;
  try {
    let user = new User();
    const userExists = await user.usernameExists(email);
    if (userExists) {
      user = await User.findOne({ email: email });
      const passwordCorrect = await user.isCorrectPassword(
        password,
        user.password
      );

      if (passwordCorrect) {
        const accessToken = user.createAccessToken();
        const refreshToken = await user.createRefreshToken();

        return res.json(
          jsonResponse(200, {
            accessToken,
            refreshToken,
            user: getUserInfo(user),
          })
        );
      } else {
        return res.status(401).json(
          jsonResponse(401, {
            error: "email y/o clave incorrecta",
          })
        );
      }
    } else {
      return res.status(401).json(
        jsonResponse(401, {
          error: "email no existe",
        })
      );
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
