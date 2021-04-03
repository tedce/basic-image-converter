const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Models
var models = require('./models');
models.sequelize.sync().then(function() {
    console.dir("Database looks good");
}).catch(function(err) {
    console.dir(err, "Data base update failure")
});

//routes
require('./routes')(app);

app.listen(port, () => {
    console.log('app listening on localhost:3000...');
});
