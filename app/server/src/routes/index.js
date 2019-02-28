const user = require('./user');
const project = require('./project');
const admin = require('./admin');
const goal = require('./goal');
const developer = require('./developer');
const clearview = require('./alexa/clearview');
const goalSocket = require('./goalSocket');

module.exports = { user, project, admin, goal, developer, clearview, goalSocket }