const express = require('express');
const router = express.Router();
//const LifePlannerService  = require('./services/LifePlannerService');
const models = require('../../db/models/index');


// get all tasks
router.get('/api/tasks', function(req, res) {
    console.log('Getting tasks...');
    models.Task.findAll({}).then(function(tasks) {
        res.json(tasks);
    });
});

// add new task
router.post('/api/tasks', function(req, res) {
    models.Task.create({
        name: req.body.name,
        complete: req.complete,
        UserId: req.body.user_id
    }).then(function(task) {
        res.json(task);
    });
});

// get single task
router.get('/api/task/:id', function(req, res) {
    models.Task.find({
        where: {
            id: req.params.id
        }
    }).then(function(task) {
        res.json(task);
    });
});



// update single task
router.put('/api/task/:id', function(req, res) {
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
router.delete('/api/task/:id', function(req, res) {
    models.Task.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(task) {
        res.json(task);
    });
});


router.post('/api/users', function(req, res) {
    models.User.create({
        name: req.body.name,
        email: req.body.email
    }).then(function(user) {
        res.json(user);
    });
});


module.exports = router;
