// var React = require('react'),
//     Fluxxor = require('fluxxor');

// var mui = require('material-ui');
// var Card = mui.Card,
//     CardTitle = mui.CardTitle,
//     CardActions = mui.CardActions,
//     CardText = mui.CardText,
//     RaisedButton = mui.RaisedButton;

// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

// var CardList = require('../components/CardList.jsx');

// var StripeCheckout = require('react-stripe-checkout');

// var Auth0Lock = require('auth0-lock');

// var Home = React.createClass({
//     componentWillMount: function() {
//          this.lock = new Auth0Lock('MUHjlTR40ID6unXkP2UAy5vKLZlQd3Jd', 'uatec.eu.auth0.com');
//          this.lock.show();
//     },
//     componentWillUnmount: function() {
//         this.lock.hide();
//     },
//     render: function() {
//         return null;
//     }
// });

// // var LoggedIn = React.createClass({
// //   getInitialState: function() {
// //     return {
// //       profile: null
// //     }
// //   },

// //   componentDidMount: function() {
// //     // In this case, the lock and token are retrieved from the parent component
// //     // If these are available locally, use `this.lock` and `this.idToken`
// //     this.props.lock.getProfile(this.props.idToken, function (err, profile) {
// //       if (err) {
// //         console.log("Error loading the Profile", err);
// //         return;
// //       }
// //       this.setState({profile: profile});
// //     }.bind(this));
// //   },

// //   render: function() {
// //     if (this.state.profile) {
// //       return (
// //         <h2>Welcome {this.state.profile.nickname}</h2>
// //       );
// //     } else {
// //       return (
// //         <div className="loading">Loading profile</div>
// //       );
// //     }
// //   }
// // });

// var ProfilePanel = React.createClass({
//     mixins: [FluxMixin, StoreWatchMixin("ProfileStore")],
    
//     render: function() 
//     {
//         var profileStore = this.getFlux().store("ProfileStore");
//         var profile = profileStore.getProfile();
        
//         if ( profileStore.isLoggedIn() ) {
//             if ( profile ) {
//                 return <h2>Welcome {profile.nickname}</h2>;
//             } else {
//                 return <p>Loading Profile</p>;
//             }
//         }
//     }
// });

// module.exports = ServerPage = React.createClass({
//     mixins: [FluxMixin, StoreWatchMixin("ServerStore", "TaskStore", "PaymentMethodStore")],

//     // componentWillMount: function() {
//     //     console.log('created lock');
//     //     this.lock = new Auth0Lock('MUHjlTR40ID6unXkP2UAy5vKLZlQd3Jd', 'uatec.eu.auth0.com');
        
//     //     this.setState({idToken: this.getIdToken()})
//     // },
    
//     getStateFromFlux: function() {
        
//         //     stripeActive: true
//         return { showLoginPanel: false};
//     },
    
//     // getIdToken: function() {
//     //     var idToken = localStorage.getItem('userToken');
//     //     var authHash = this.lock.parseHash(window.location.hash);
//     //     if (!idToken && authHash) {
//     //     if (authHash.id_token) {
//     //         idToken = authHash.id_token
//     //         localStorage.setItem('userToken', authHash.id_token);
//     //     }
//     //     if (authHash.error) {
//     //         console.log("Error signing in", authHash);
//     //         return null;
//     //     }
//     //     }
//     //     return idToken;
//     // },
//     // onToken: function() {
//     //     console.log("subscription created: ", arguments);
//     //     this.getFlux().actions.createSubscription(arguments[0].id, 
//     //         'TEST_01', 
//     //         arguments[0].email);
//     // },
    
//     onToken: function() {
//         console.log('stripe transaction completed');
//     },
    
//     // onStripeScriptError: function() {
//     //     // this.replaceState({
//     //     //     stripeActive: false
//     //     // });
//     // },
    
//     render: function() {

//         var servers = this.getFlux().store("ServerStore").getServers();
//         var tasks = this.getFlux().store("TaskStore").getTasks();
//         var paymentMethods = this.getFlux().store("PaymentMethodStore").getPaymentMethods();
       
//         // var activeSubscriptions = subscriptions ? subscriptions.filter(function(s) {
//         //     return Date.now() < s.subscriptionEnds * 1000;
//         // }) : [];
        
//         return (<div>
//             {this.state.showLoginPanel ? <Home /> : null}
            
//             <RaisedButton onClick={function(){this.setState({showLoginPanel: !this.state.showLoginPanel})}.bind(this)} label="Sign in" />
            
//             <div>
//             <StripeCheckout
//                     onScriptError={this.onStripeScriptError}
//                     name="my payment company"
//                     description="payments are done here"
//                     token={this.onToken}
//                     stripeKey="pk_test_ond97dDe2ekUZpnGrfxFIyBB" />
                    
//                     <CardList values={servers} loadingText="Just finding your servers..." noDataText="You don't have any servers yet."
//                     template={function(v){
//                     return (
//                     <CardActions>
//                         <CardTitle title={v.friendlyName} subtitle="000.000.000.000" />
//                         <CardText>{v.actualStatus}</CardText>
//                         <RaisedButton label="Delete" onClick={function() { page.getFlux().actions.deleteServer(v); }} />
//                     </CardActions>);
//                     }}>
//                 </CardList>
//                 <hr />
//                 <CardList values={tasks} loadingText="Finding if anything's going on..." noDataText="Nothing's happening right now."
//                     template={function(v){
//                     return (
//                     <CardActions>
//                         <CardTitle title={v.action} subtitle={v.taskStatus}/>
//                         <CardText>
//                             {v.message}
//                         </CardText>
//                     </CardActions>);
//                     }}>
//                 </CardList>
                
//                 <hr />
//                 <CardList values={paymentMethods} loadingText="Seeing if you have any active payment methods." noDataText="You need to set up a payment method."
//                     template={function(v){
//                     return (
//                     <CardActions>
//                         <CardTitle title={v.plan} subtitle={v.subscriptionEnds || 'inactive'}/>
//                     </CardActions>);
//                     }}>
//                 </CardList>
//             </div>  
//             </div>
//         );
//     }    
// });
