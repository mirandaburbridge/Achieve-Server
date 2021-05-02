require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db');

let user = require('./controllers/user-controller');
let goals = require('./controllers/goals-controller');
let items = require('./controllers/items-controller');
let notes = require('./controllers/notes-controller');

sequelize.sync();
// sequelize.sync({force: true})

app.use(express.json());
app.use(require('./middleware/headers'));

app.use('/user', user);
app.use(require('./middleware/validate-session'));
app.use('/goals', goals);
app.use('/items', items);
app.use('/notes', notes);

app.listen(3000, function () {
    console.log('App is listening on port 3000');
})