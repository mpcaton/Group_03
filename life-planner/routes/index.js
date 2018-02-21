const routes = require('express').Router();
const tasks = require('./tasks');

routes.use('/api/tasks', tasks);

routes.get('/api', (req, res) => {
  res.status(200).json({ message: 'Connected to the API!' });
});

module.exports = routes;
