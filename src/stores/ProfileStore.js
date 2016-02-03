var Fluxxor = require('fluxxor');

var events = require('../constants.js').events;
// var actions = require('../actions/actions.js');

var ProfileStore = Fluxxor.createStore({
	initialize: function()
	{ 
        this.token = null;
        this.profile = null;
        this.bindActions(
            events.SIGNED_IN, this._profileChanged
        );
	},
    
    _profileChanged: function(payload) {
        this.profile = payload;
        this.emit('change');
    },
    
    isSignedIn: function() { return this.profile != null },
    getToken: function() { return this.token; },
    
    getProfile: function() {
        return this.profile;
    }
});

module.exports = ProfileStore;