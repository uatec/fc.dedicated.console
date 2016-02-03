var React = require('react'),
    Fluxxor = require('fluxxor');
   
var ReactRouter = require('react-router'),
    Link = ReactRouter.Link;
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;
var mui = require('material-ui');
var AppBar = mui.AppBar,
    LeftNav = mui.LeftNav;
    MenuItem = mui.MenuItem,
    RaisedButton = mui.RaisedButton;


var ExitIcon = require('material-ui/lib/svg-icons/action/exit-to-app');

module.exports = App = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProfileStore')],
    
    // componentWillMount: function() {
        
        
    //     this.lock = new Auth0Lock('MUHjlTR40ID6unXkP2UAy5vKLZlQd3Jd', 'uatec.eu.auth0.com');
    //     var token = this.getIdToken();
    //     this.setState({idToken: token});
    //     console.log("wil mount");
    //     if ( !token )
    //     {    
    //         this.lock.show();
    //     }
    // },
    
    // componentWillUnmount: function() {
    //     this.lock.hide();
    // },
    
    componentWillMount: function() {
        if ( !this.getFlux().store('ProfileStore').isSignedIn() )
        {
            if (!this.getFlux().actions.setPrincipalFromHash(window.location.hash)) {
                    this.getFlux().actions.initiateLogin();
            }
        }
    },
    
    getStateFromFlux: function() {
        console.log('App getting stat from flux: ', this.getFlux().store('ProfileStore').isSignedIn());
        return { 
            openNavPanel: false,
            isSignedIn: this.getFlux().store('ProfileStore').isSignedIn()
        };
    },
    
    // getIdToken: function() {
    //     var idToken = localStorage.getItem('userToken');
    //     var authHash = this.lock.parseHash(window.location.hash);
    //     if (!idToken && authHash) {
    //         if (authHash.id_token) {
    //             idToken = authHash.id_token
    //             this.getFlux().actions.setPrincipal(idToken);
    //         }
    //         if (authHash.error) {
    //             console.log("Error signing in", authHash);
    //             return null;
    //         }
    //     }
    //     return idToken;
    // },
    
    signOut: function() {
        this.getFlux().actions.signOut();
    },
    
    closeNav: function() {
        this.setState({
            openNavPanel: false
        })
    },
    
    render: function() {
        if (this.state.isSignedIn) {
            var logoutButton = <ExitIcon onClick={this.signOut} />
            return (<div>
                    <AppBar title="FortressCraft Dedicated Server Admin"
                        onLeftIconButtonTouchTap={function(){this.setState({openNavPanel:true});}.bind(this)}
                        iconElementRight={logoutButton}
                        />
                    <LeftNav docked={false}
                        width={200}
                        open={this.state.openNavPanel}
                        onRequestChange={function(openNavPanel){this.setState({openNavPanel});}.bind(this)}
                        >
                        <MenuItem><Link to={`/Servers`} onClick={this.closeNav}>Servers</Link></MenuItem>
                        <MenuItem><Link to={`/PaymentMethods`} onClick={this.closeNav}>Payment Methods</Link></MenuItem>
                        <MenuItem><Link to={`/Profile`} onClick={this.closeNav}>Profile</Link></MenuItem>
                    </LeftNav>
                    {this.props.children}
                </div>
            );
        } else {
            return <div>Loading...</div>
        }
    }    
});
