const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const constants = require("./../../constants");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const jwt = require("jwt-simple");

// req model
const user = require("../../database/models/model_user");

router.post("/register", async (req, res) => {
  try {
    // create token
    req.body.token = makeid(10);
    // encrypt password
    req.body.password = bcrypt.hashSync(req.body.password, 8);

    let result = await user.create(req.body);
    //send validate email

    res.json({
      result,
      api_result: constants.OK,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      api_result: constants.NOK,
    });
  }
});

router.post("/login", async function (req, res) {
  try {
    const { username, password, lastWebsite } = req.body;

    if (lastWebsite == null || lastWebsite === "") {
      res.json({
        error: "Please post last website",
        api_result: constants.NOK,
      });
      return;
    }

    let result = await user.findOne({ where: { username: username } });
    if (result != null) {
      if (
        result.levelUser == "user" ||
        result.levelUser == "power" ||
        result.levelUser == "admin"
      ) {
        if (bcrypt.compareSync(password, result.password)) {
          //update lastwebsite and token
          let token = await makeid(10);
          await user.update({ lastWebsite, token }, { where: { username } });

          // JWT
          const payload = {
            username: result.username,
            token,
            iat: new Date(), //มาจากคำว่า issued at time (สร้างเมื่อ)
          };

          //login pass
          console.log("login Pass");
          res.json({
            result: {
              username: result.username,
              levelUser: result.levelUser,
            },
            api_result: constants.OK,
            jwt: jwt.encode(payload, constants.SECRET_KEY),
          });
        } else {
          //Password failed
          console.log("Incorrect password");
          res.json({
            error: "Incorrect password",
            api_result: constants.NOK,
          });
        }
      } else {
        //User class not validate
        console.log("Please validate email");
        res.json({
          error: "Please validate email",
          api_result: constants.NOK,
        });
      }
    } else {
      console.log("Username not found please register");
      res.json({
        error: "Username not found please register",
        api_result: constants.NOK,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      error,
      api_result: constants.NOK,
    });
  }
});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = router;
