var Fluxxor = require('fluxxor');

var events = require('../constants.js').events;
// var actions = require('../actions/actions.js');

var PaymentMethodStore = Fluxxor.createStore({
	initialize: function()
	{ 
        this.paymentMethods = null;
        this.bindActions(
            events.PAYMENTMETHODS_CHANGED, this._paymentMethodsChanged
        );
	},
    
    _paymentMethodsChanged: function(payload) {
        this.paymentMethods = payload;
        this.emit('change');
    },
    
    getPaymentMethods: function() {
        return this.paymentMethods;
    }
});

module.exports = PaymentMethodStore;