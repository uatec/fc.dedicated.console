var React = require('react'),
    Fluxxor = require('fluxxor');

var mui = require('material-ui');
var Card = mui.Card;

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;


module.exports = PaymentMethod = React.createClass({
    mixins: [FluxMixin],

    getStateFromFlux: function() {
        
        return {};
    },
    
    
    render: function() {

       return <div>{this.props.paymentMethod.object} ending in {this.props.paymentMethod.last4}</div>;
    }    
});
