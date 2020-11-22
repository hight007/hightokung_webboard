const Sequelize = require("sequelize");
const sequelize = new Sequelize("myDatabase", "root", "hight007", {
    host: "192.168.1.200",
    dialect: "mariadb",
    connectionLimit: 10,
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

(async() => {
    await sequelize.authenticate();
})();

module.exports = sequelize;