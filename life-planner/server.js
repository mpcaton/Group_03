// server.js
const express = require('express');
const api = require('./routes');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
// *** express instance *** //
const app = express();

const PORT = process.env.PORT || 8080;
app.set('PORT',PORT);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// START THE SERVER
// =============================================================================
//app.listen(PORT);
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Running on localhost:${PORT}`));

module.exports = app;
