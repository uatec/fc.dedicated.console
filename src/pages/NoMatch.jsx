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

module.exports = NoMatch = React.createClass({
    
    render: function() {
        return <h1>This is not the page you are looking for.</h1>;
     
    }    
});
