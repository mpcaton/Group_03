const dbModels = require('../../db/models');

module.exports = (req, res) => {
  dbModels.Task.create({
    name: req.body.name,
    complete: req.body.complete,
    UserId: req.body.user_id
  }).then(function(task) {
    res.status(200).json({ task });
  });
};
