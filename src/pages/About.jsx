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

module.exports = About = React.createClass({
    
    render: function() {
        return <Card>
            <CardTitle title="FortressCraft Dedicated Server Administration Panel"
                subtitle="Enquiries: info@fortresscraft.com" />
            <CardText>
                Robert Stiff (<a href="mailto:fcd@hidefsoftware.co.uk">fcd@hidefsoftware.co.uk</a>)
            </CardText>
        </Card>;
     
    }    
});
