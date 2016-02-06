var React = require('react');
var ReactDOM = require('react-dom');
// var ServerPage = require('./pages/ServerPage.jsx');
var Fluxxor = require('fluxxor');
var ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    Router = ReactRouter.Router,
    browserHistory = ReactRouter.browserHistory;

var App = require('./pages/App.jsx'),
    About = require('./pages/About.jsx'),
    PaymentMethods = require('./pages/PaymentMethods.jsx'),
    PaymentMethod = require('./pages/PaymentMethod.jsx'),
    Servers = require('./pages/Servers.jsx'),
    Server = require('./pages/Server.jsx'),
    Profile = require('./pages/Profile.jsx'),
    NoMatch = require('./pages/NoMatch.jsx');


require('react-tap-event-plugin')();
var PaymentMethodStore = require('./stores/PaymentMethodStore.js'),
    ProfileStore = require('./stores/ProfileStore.js'),
    ServerStore = require('./stores/ServerStore.js');
//     PaymentMethodStore = require('./stores/PaymentMethodStore.js'),
//     TaskStore = require('./stores/TaskStore.js');

var stores = window.stores = {
  PaymentMethodStore: new PaymentMethodStore(),
  ProfileStore: new ProfileStore(),
  ServerStore: new ServerStore()
//   TaskStore: new TaskStore(),
//  PaymentMethodStore: new PaymentMethodStore()
};
var actions = require('./actions');


var flux = new Fluxxor.Flux(stores, actions);


var wrapper = function(Component, context) {
  return React.createClass({
    propTypes: {
    },

    childContextTypes: {
      flux: React.PropTypes.object,
    },

    getChildContext: function() {
      return {
        flux: context
      };
    },

    componentDidMount: function(){

    },

    render: function() {
      return (
        <Component {...this.props}/>
      );
    }
  });
};

var routes =(
  <Router history={browserHistory}>
    <Route path="/" component={wrapper(App, flux)}>
      <Route path="about" component={About}/>
      <Route path="paymentmethods" component={PaymentMethods}>
        <Route path="/paymentmethod/:userId" component={PaymentMethod}/>
      </Route>
      <Route path="servers" component={Servers}>
        <Route path="/server/:serverid" component={Server}/>
      </Route>
      <Route path="profile" component={Profile}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>);

ReactDOM.render(
    routes,
    document.getElementById("content")
);