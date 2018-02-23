const routes = require('express').Router();
const tasks = require('./tasks');

routes.use('/tasks', tasks);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected to the API!' });
});

module.exports = routes;
