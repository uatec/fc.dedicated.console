var React = require('react'),
    Fluxxor = require('fluxxor');

var mui = require('material-ui');
var Card = mui.Card,
    CardTitle = mui.CardTitle,
    CardActions = mui.CardActions,
    CardText = mui.CardText,
    RaisedButton = mui.RaisedButton;

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CardList = require('../components/CardList.jsx');

var StripeCheckout = require('react-stripe-checkout');

module.exports = ServerPage = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("ServerStore", "TaskStore", "SubscriptionStore")],

    componentDidMount: function() {
            this.getFlux().actions.fetchServers();
            this.getFlux().actions.fetchTasks();
            this.getFlux().actions.fetchSubscriptions();
            
    },

    getStateFromFlux: function() {
        
        // var interval = setInterval(function() {
            // this.getFlux().actions.fetchServers();
            // this.getFlux().actions.fetchTasks();
            // this.getFlux().actions.fetchSubscriptions();
          
        // }.bind(this), 10000);
        
        var state = { 
            servers: this.getFlux().store('ServerStore').getServers(),
            tasks: this.getFlux().store('TaskStore').getTasks(),
            subscriptions: this.getFlux().store('SubscriptionStore').getSubscriptions(),
            stripeActive: true
        };  
        console.log('new state: ', state);
        return state;  
    },
    
    onToken: function() {
        console.log("subscription created: ", arguments);
        this.getFlux().actions.createSubscription(arguments[0].id, 
            'TEST_01', 
            arguments[0].email);
    },
    
    onStripeScriptError: function() {
        // this.replaceState({
        //     stripeActive: false
        // });
    },
    
    render: function() {

        var servers = this.state.servers;
        var tasks = this.state.tasks;
        var subscriptions = this.state.subscriptions;
        var activeSubscriptions = subscriptions ? subscriptions.filter(function(s) {
            return Date.now() < s.subscriptionEnds * 1000;
        }) : [];
        
        console.log("active subscriptions: ", activeSubscriptions);
        var page = this;
        return (
            <div>
                <h1>Servers</h1>
                {(activeSubscriptions && activeSubscriptions.length) ? <RaisedButton label="Create a new server" onClick={this.getFlux().actions.createNewServer}/> : null}
                
                <hr />
                {this.state.stripeActive ?
                <div><StripeCheckout
                    onScriptError={this.onStripeScriptError}
                    name="my payment company"
                    description="payments are done here"
                    token={this.onToken}
                    stripeKey="pk_test_ond97dDe2ekUZpnGrfxFIyBB" />
                <hr /> </div>: null}
                <CardList values={servers} loadingText="Just finding your servers..." noDataText="You don't have any servers yet."
                    template={function(v){
                    return (
                    <CardActions>
                        <CardTitle title={v.friendlyName} subtitle="000.000.000.000" />
                        <CardText>{v.actualStatus}</CardText>
                        <RaisedButton label="Delete" onClick={function() { page.getFlux().actions.deleteServer(v); }} />
                    </CardActions>);
                    }}>
                </CardList>
                
                <hr />
                <CardList values={tasks} loadingText="Finding if anything's going on..." noDataText="Nothing's happening right now."
                    template={function(v){
                    return (
                    <CardActions>
                        <CardTitle title={v.action} subtitle={v.taskStatus}/>
                        <CardText>
                            {v.message}
                        </CardText>
                    </CardActions>);
                    }}>
                </CardList>
                
                <hr />
                <CardList values={subscriptions} loadingText="Seeing if you have any active subscriptions." noDataText="You need to set up a subcription."
                    template={function(v){
                    return (
                    <CardActions>
                        <CardTitle title={v.plan} subtitle={v.subscriptionEnds || 'inactive'}/>
                    </CardActions>);
                    }}>
                </CardList>
            </div>  
        );
    }    
});
