var models = require('../db/models');
var express = require('express');
var router = express.Router();
/*
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
*/

router.get('/', function(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    res.render('index', {
      title: 'Sequelize: Express Example',
      users: users
    });
  });
});
router.post('/users', function(req, res) {
    models.User.create({
        name: req.body.name,
        email: req.body.email
    }).then(function(user) {
        res.json(user);
    });
});

// get all tasks
router.get('/tasks', function(req, res) {
    models.Task.findAll({}).then(function(tasks) {
        res.json(tasks);
    });
});

// get single task
router.get('/task/:id', function(req, res) {
    models.Task.find({
        where: {
            id: req.params.id
        }
    }).then(function(task) {
        res.json(task);
    });
});

// add new task
router.post('/tasks', function(req, res) {
    models.Task.create({
        name: req.body.name,
        UserId: req.body.user_id
    }).then(function(task) {
        res.json(task);
    });
});

// update single task
router.put('/task/:id', function(req, res) {
    models.Task.find({
        where: {
            id: req.params.id
        }
    }).then(function(task) {
        if(task){
            task.updateAttributes({
                name: req.body.name,
                complete: req.body.complete
            }).then(function(task) {
                res.send(task);
            });
        }
    });
});

// delete a single task
router.delete('/task/:id', function(req, res) {
    models.Task.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(task) {
        res.json(task);
    });
});

module.exports = router;