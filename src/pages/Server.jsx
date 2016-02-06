var React = require('react'),
    Fluxxor = require('fluxxor');

var mui = require('material-ui'),
    Card = mui.Card,
    CardTitle = mui.CardTitle,
    CardActions = mui.Card,
    RaisedButton = mui.RaisedButton,
    Card = mui.Card;

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;


module.exports = Server = React.createClass({
    // mixins: [FluxMixin],

    // getStateFromFlux: function() {
        
    //     return {};
    // },
    
    render: function() {
        console.log('rendering server: ', this.props);
        
        var dnsName = this.props.server.server ? this.props.server.server.dnsName : 'not ready';
        
        return <span>
           <Card>
                <CardTitle title={this.props.server.config.friendlyName}
                    subtitle={dnsName} />
                   <CardActions>
                   </CardActions>
            </Card>
            <br />
            </span>;
    }    
});
