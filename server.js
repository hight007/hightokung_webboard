const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const jwtAuth = require("./middleware/passport");

//JWT
passport.use(jwtAuth);
const requireJWTAuth = passport.authenticate("jwt", { session: false });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500;
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        },
    });
});

app.use(
    "/api/highToKungWebboard/authen/",
    require("./api/authen/api_authentication")
);
app.use(
    "/api/highToKungWebboard/authen/",
    requireJWTAuth,
    require("./api/authen/api_user")
);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});