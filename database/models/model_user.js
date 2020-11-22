const { Sequelize, DataTypes } = require("sequelize");
const database = require("../connection");

const user = database.define(
    "user", {
        // attributes
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Required",
                },
                len: {
                    args: [4, 50],
                    msg: "String length is not in this range",
                },
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            isEmail: true,
            unique: true,
        },
        token: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        levelUser: {
            type: Sequelize.STRING,
            defaultValue: "guest",
            allowNull: false,
        },
        lastWebsite: {
            type: Sequelize.STRING,
            defaultValue: "",
            allowNull: false,
        },
    }, {
        //option
    }
);

(async() => {
    await user.sync({ force: false });
})();

module.exports = user;