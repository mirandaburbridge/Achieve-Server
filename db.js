const Sequelize = require('sequelize');
// const { DataTypes } = require("sequelize");
const sequelize = new Sequelize('Achieve', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function () {
        console.log('Connected!');
    },
    function (err) {
        console.log(err);
    }
);

//init db as an empty object to store all db related models/objects/functions
// const db = {};

// //main instances
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// //models
// db.user = sequelize.import("./models/user");
// db.goals = sequelize.import("./models/goals");
// db.notes = sequelize.import("./models/notes");


// //sync tables in order to make sure associations do not fail
// const syncDB = async () => {
//     //tables
//     await db.user.sync();

//     //the rest of the table
//     await db.sequelize.sync();
// };

// //add syncDB function to db object
// db.sync = syncDB;

// module.exports = db;
module.exports = sequelize;