var React = require('react');
var ReactDOM = require('react-dom');
var ServerPage = require('./pages/ServerPage.jsx');
var Fluxxor = require('fluxxor');

require('react-tap-event-plugin')();
var ServerStore = require('./stores/ServerStore.js'),
    SubscriptionStore = require('./stores/SubscriptionStore.js'),
    TaskStore = require('./stores/TaskStore.js');

var stores = window.stores = {
  ServerStore: new ServerStore(),
  TaskStore: new TaskStore(),
  SubscriptionStore: new SubscriptionStore()
};
var actions = require('./actions');


var flux = new Fluxxor.Flux(stores, actions);

// flux.on("dispatch", function(type, payload) {
//   if (console && console.log) {
//     console.log("[Dispatch]", type, payload);
//   }
// });

ReactDOM.render(
  <ServerPage flux={flux} />,
  document.getElementById('content')
);