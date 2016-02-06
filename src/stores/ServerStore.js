var Fluxxor = require('fluxxor');

var events = require('../constants.js').events;
// var actions = require('../actions/actions.js');

var ServerStore = Fluxxor.createStore({
	initialize: function()
	{ 
        this.servers = null;
        this.bindActions(
            events.SERVERS_CHANGED, this._serversChanged
        );
	},
    
    _serversChanged: function(payload) {
        this.servers = payload;
        this.emit('change');
    },
    
    getServers: function() {
        return this.servers;
    }
});

module.exports = ServerStore;