// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var session = require('express-session')
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './bike/dist')));

app.use(session({
    secret: "sosecretthekeyis",
    resave: false,
    saveUninitialized: true
}))

require('./server/config/mongoose.js');
var route_setter = require('./server/config/routes.js')
route_setter(app);
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
