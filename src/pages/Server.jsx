var React = require('react'),
    Fluxxor = require('fluxxor');

var mui = require('material-ui');
var Card = mui.Card;

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;


module.exports = Server = React.createClass({
    mixins: [FluxMixin],

    getStateFromFlux: function() {
        
        return {};
    },
    
    
    render: function() {
        return this.props.server.friendlyName;
    }    
});
