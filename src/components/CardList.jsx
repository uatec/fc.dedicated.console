var React = require('react'),
    Fluxxor = require('fluxxor');

var mui = require('material-ui');
var Card = mui.Card,
    CardTitle = mui.CardTitle,
    CardActions = mui.CardActions,
    CardText = mui.CardText,
    RaisedButton = mui.RaisedButton;

module.exports = CardList = React.createClass({

    render: function() {

        if ( this.props.values == null) {
            return <p>{this.props.loadingText}</p>;
        } 
        if ( this.props.values.length == 0 ) {
            return (<p>{this.props.noDataText}</p>);
        }

        var cards = (
            this.props.values.map(function(v, idx) {
                return (
                <Card id={idx}>
                    {this.props.template(v)}
                </Card>);   
            }.bind(this))
        );   
        
        console.log("CardList contents ", cards)
        return <div>{cards}</div>;
    }
});