const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const constants = require("./../../constants");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// model
const user = require("../../database/models/model_user");

router.get("/user/", async(req, res) => {
    try {
        let result = await user.findAll({
            attributes: [
                "username",
                "levelUser",
                "lastWebsite",
                "createdAt",
                "updatedAt",
            ],
        });
        res.json({
            result,
            api_result: constants.OK,
        });
    } catch (error) {
        res.json({
            result: JSON.stringify(error),
            api_result: constants.NOK,
        });
    }
});

module.exports = router;