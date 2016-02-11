var React = require('react'),
    Fluxxor = require('fluxxor');

var mui = require('material-ui');
var Card = mui.Card,
    CardTitle = mui.CardTitle;;

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;


module.exports = PaymentMethod = React.createClass({
    mixins: [FluxMixin],

    getStateFromFlux: function() {
        
        return {};
    },
    
    
    render: function() {

       return <Card>
        <CardTitle>
            {this.props.paymentMethod.object} ending in {this.props.paymentMethod.last4}
        </CardTitle>
       </Card>;
    }    
});
