/* eslint no-param-reassign: 0 */
const dbModels = require('../db/models');
/*
dbModels.Task.find({
  where: {
    id: req.params.taskId * 1
  }
}).then(function(task) {
  res.status(200).json({ task });
});
*/

module.exports = type => {
  return (req, res, next, value) => {
    const obj = dbModels[type].find({
      where: {
        id: req.params.id
      }
    });

    if (obj) {
      req[type] = obj;
      next();
    } else {
      res.status(404).send(`Invalid ${type} ID`);
    }
  };
};
