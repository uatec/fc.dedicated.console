var React = require('react'),
    Fluxxor = require('fluxxor');


var Server = require('./Server.jsx');

var mui = require('material-ui');
var Card = mui.Card;

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;


module.exports = Servers = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("ServerStore")],

    getStateFromFlux: function() {
        
        return {};
    },
    
    
    render: function() {
        var servers = this.getFlux().store("ServerStore").getServers();
        var renderedServers = servers ? servers.forEach(function(s) {
                    return <Server server={s} />
                }) : "You haven't created any servers yet.";
        return <div>
            <div>Server</div>
                {renderedServers}
        </div>;
    }    
});
