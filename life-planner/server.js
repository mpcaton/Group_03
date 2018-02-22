// server.js
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
// *** express instance *** //
var app = express();

const PORT = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let distDir = __dirname + "/dist/";
app.use(express.static(distDir));
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/', routes);

// START THE SERVER
// =============================================================================
//app.listen(PORT);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
