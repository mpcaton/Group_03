const dbModels = require('../../db/models');

module.exports = (req, res) => {
  dbModels.Task.find({
    where: {
      id: req.params.taskId * 1
    }
  }).then(function(task) {
    res.status(200).json({ task });
    });



};
