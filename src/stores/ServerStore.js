var Fluxxor = require('fluxxor');

var constants = require('../constants.js');
// var actions = require('../actions/actions.js');

var ServerStore = Fluxxor.createStore({
	initialize: function()
	{ 
        this.servers = null;
        this.bindActions(
            constants.SERVERS_CHANGED, this._serversChanged
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