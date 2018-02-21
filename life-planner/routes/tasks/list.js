const dbModels = require('../../db/models');


module.exports = (req, res) => {
  dbModels.Task.findAll({}).then(function(tasks) {
    res.status(200).json({ tasks });
  });
};
