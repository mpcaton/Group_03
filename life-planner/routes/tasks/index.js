const tasks = require('express').Router();
const list = require('./list');
const create = require('./create');
const show = require('./show');
//const edit = require('./edit');

console.log('entering task api routes...');

tasks.get('/:taskId', show);
tasks.get('/', list);
tasks.post('/', create);
//tasks.put('/:taskId', edit);

module.exports = tasks;
