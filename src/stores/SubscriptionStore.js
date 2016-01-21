var Fluxxor = require('fluxxor');

var constants = require('../constants.js');
// var actions = require('../actions/actions.js');

var SubscriptionStore = Fluxxor.createStore({
	initialize: function()
	{ 
        this.subscriptions = null;
        this.bindActions(
            constants.SUBSCRIPTIONS_CHANGE, this._subscriptionsChange
        );
	},
    
    _subscriptionsChange: function(payload) {
        this.subscriptions = payload;
        this.emit('change');
    },
    
    getSubscriptions: function() {
        return this.subscriptions;
    }
});

module.exports = SubscriptionStore;