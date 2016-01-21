var Fluxxor = require('fluxxor');

var constants = require('../constants.js');
// var actions = require('../actions/actions.js');

var TaskStore = Fluxxor.createStore({
	initialize: function()
	{ 
        this.tasks = null;
        this.bindActions(
            constants.TASKS_CHANGED, this._tasksChanged
        );
	},
    
    _tasksChanged: function(payload) {
        this.tasks = payload;
        this.emit('change');
    },
    
    getTasks: function() {
        return this.tasks;
    }
});

module.exports = TaskStore;