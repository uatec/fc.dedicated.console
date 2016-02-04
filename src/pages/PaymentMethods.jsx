var React = require('react'),
    Fluxxor = require('fluxxor');
    
var strings = require('../constants.js').strings;

var PaymentMethod = require('./PaymentMethod.jsx');

var StripeCheckout = require('react-stripe-checkout');

var mui = require('material-ui');
var Card = mui.Card;

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;


module.exports = PaymentMethods = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("PaymentMethodStore")],

    getStateFromFlux: function() {
        this.getFlux().actions.fetchPaymentMethods();
        return {};
    },
    
    _onStripeScriptError: function()
    {
        console.log("Stripe script error: ", arguments);
    },
    
    _paymentDetailsReady: function(paymentSetupDetails) {
        this.getFlux().actions.savePaymentMethod(paymentSetupDetails.id); 
    },

    render: function() {
        var paymentMethods = this.getFlux().store("PaymentMethodStore").getPaymentMethods();
        var renderedPaymentMethods = paymentMethods ? paymentMethods.map(function(m) {
                    return <PaymentMethod paymentMethod={m} />
                }) : "You haven't set up any paymentMethods yet.";

        var userEmail = this.getFlux().store('ProfileStore').getProfile().email;
        return <div>
            <div>PaymentMethods</div>
                {renderedPaymentMethods}
            <div>
                <StripeCheckout
                    email={userEmail}
                    onScriptError={this._onStripeScriptError}
                    name={strings.companyName}
                    description={strings.companyTagline}
                    token={this._paymentDetailsReady}
                    stripeKey={strings.stripeKey} />
            </div>
        </div>;
    }    
});
