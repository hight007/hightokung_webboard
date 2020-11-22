const constants = require("../constants");
//ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt;
//ใช้ในการประกาศ Strategy
const JwtStrategy = require("passport-jwt").Strategy;
// req model
const user = require("../database/models/model_user");

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: constants.SECRET_KEY, //SECRETเดียวกับตอนencodeในกรณีนี้คือ MY_SECRET_KEY
};

const jwtAuth = new JwtStrategy(jwtOptions, async(payload, done) => {
    console.log("check token authentication");
    let user_data = await user.findOne({ where: { username: payload.username } });
    if (user_data.token === payload.token) {
        done(null, true);
    } else {
        done(null, false);
    }
});

module.exports = jwtAuth;