var React = require('react'),
    Fluxxor = require('fluxxor');


var Server = require('./Server.jsx');

var mui = require('material-ui');
var Card = mui.Card,
    TextField = mui.TextField,
    RaisedButton = mui.RaisedButton;
    SelectField = mui.SelectField;
    MenuItem = mui.MenuItem;

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;


module.exports = Servers = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("ServerStore")],

    getStateFromFlux: function() {
        
        return {};
    },
    
    createServer: function()
    {
        this.getFlux().actions.createServer(this.state.serverName, this.state.instanceType);
    },
    
    
    handleServerNameChange: function(event) {
        this.setState({
            serverName: event.target.value,
        });
    },
    
    handleInstanceTypeChange: function(event, index, value) {
        this.setState({
            instanceType: value,
        });
    },
    
    render: function() {
        var servers = this.getFlux().store("ServerStore").getServers();
        console.log('rendering servers: ', servers);
        if ( servers == null )  {           
            this.getFlux().actions.fetchServers();
            return <div>Let's see if you've got any servers set up yet.</div>;
        }
        
        
        var renderedServers = servers ? servers.map(function(s, idx) {
            console.log('rendering server: ', arguments);
                    return <Server server={s} key={idx} />;
                }) : "You haven't created any servers yet.";
                console.log('exampe rendred servers', renderedServers);

        return <div>
            <div>Server</div>
            <Card>
            <TextField
                onChange={this.handleServerNameChange}
                value={this.state.serverName}
                hintText="Be creative"
                floatingLabelText="Server name"
                />
            <br />
            <SelectField floatingLabelText="Server size" value={this.state.instanceType} onChange={this.handleInstanceTypeChange}>
                <MenuItem key={1} value="instanceType://aws/eu-ie/t2.small" primaryText="Tiny"/>
                <MenuItem key={2} value="instanceType://aws/eu-ie/t2.large" primaryText="Small"/>
                <MenuItem key={3} value="instanceType://aws/eu-ie/m4.xlarge	" primaryText="Large"/>
                <MenuItem key={4} value="instanceType://aws/eu-ie/m4.2xlarge" primaryText="Massive"/>
                <MenuItem key={5} value="instanceType://aws/eu-ie/m4.10xlarge" primaryText="Utterly Collosal"/>
            </SelectField>
            <br />
            <RaisedButton label="Create" primary={true} onClick={this.createServer} />
            </Card>
            <div>
            {renderedServers}
            </div>
        </div>;
    }    
});
