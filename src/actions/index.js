var promise = require('promise');
var events = require('../constants.js').events;
var qwest = require('qwest');

var Auth0Lock = require('auth0-lock');
var api = "http://localhost:8080/api/";

function pickName()
{
    var names = [
        'Amun',
        'Beyonder',
        'Caretaker',
        'Drax',
        'Echo',
        'Firebrand',
        'Gambit',
        'Hellion',
        'Inertia'
    ];

    return names[Math.floor(Math.random() * names.length)];
}


function getAuthorizationHeader()
{
    return "Bearer " + localStorage.getItem('userToken');
}

var lock = new Auth0Lock('MUHjlTR40ID6unXkP2UAy5vKLZlQd3Jd', 'uatec.eu.auth0.com');
        
module.exports = {
    
    initiateLogin: function() {
        lock.show();
    },
    
    setPrincipalFromHash: function(hash) {
        var authHash = lock.parseHash(window.location.hash);
        if ( authHash ) {
            this.flux.actions.setPrincipal(authHash.id_token);
            return true;
        } else { 
            return false;
        }
    },
    
    setPrincipal: function(jwt) {
        // TODO: "SetPrincipal()"
        // i.e. pass it to an action which should validate this users's existence with the back end
        // if they don't exist, then create them 
        // after that, or if they do exist, then load their profile from auth0 before displaying the application
        lock.getProfile(jwt, function (err, profile) {
                if (err) {
                    console.log("Error loading the Profile", err);
                    return;
                }
                this.dispatch(events.SIGNED_IN, profile);
            }.bind(this));
    },
    
    savePaymentMethod: function(token) {
        var payload = {
            token: token
        };
        
        qwest.post(api + 'secured/savepaymentmethod', payload, {
            dataType: 'json',
            "headers": {"Authorization": getAuthorizationHeader()}
        }).then(function() { 
            this.flux.actions.fetchPaymentMethods();
        }.bind(this)); 
    },
    
    fetchServers: function() {
        qwest.get(api + 'servers', null, {
            "headers": {"Authorization": getAuthorizationHeader()}
            })
        .then(function(xhr, response) {
            var data = JSON.parse(response);
            var servers = '_embedded' in data ? 'servers' in data._embedded ? data._embedded.servers : [] : [];
            this.dispatch(events.SERVERS_CHANGED, servers);
        }.bind(this))
        .catch(console.log);  
    },    
    
    fetchPaymentMethods: function() {
        qwest.get(api + 'paymentmethods', null, {
            "headers": {"Authorization": getAuthorizationHeader()}
            })
        .then(function(xhr, response) {
            var data = JSON.parse(response);
            var paymentmethods = '_embedded' in data ? 'paymentmethods' in data._embedded ? data._embedded.paymentmethods : [] : [];
            this.dispatch(events.PAYMENTMETHODS_CHANGED, paymentmethods);
        }.bind(this))
        .catch(console.log);  
    },    
    
    fetchTasks: function() {
        qwest.get(api + 'tasks', null, {
            "headers": {"Authorization": getAuthorizationHeader()}
            })
        .then(function(xhr, response) {
            var data = JSON.parse(response);
            var tasks = '_embedded' in data ? 'tasks' in data._embedded ? data._embedded.tasks : [] : [];
            this.dispatch(events.TASKS_CHANGED, tasks);
        }.bind(this))
        .catch(console.log);  
    },
    
    createNewServer: function() {
        var payload = {
                serverId: pickName(),
                action: 'Create',
                userEmail: 'uatecuk@gmail.com'
            };

        qwest.post(api + 'tasks', payload, {
                dataType: 'json',
            "headers": {"Authorization": getAuthorizationHeader()}
            })
        .then(function(xhr, response) {
            this.flux.actions.fetchTasks();
            this.flux.actions.fetchServers();
            this.flux.actions.fetchSubscriptions();
        }.bind(this))
        .catch(console.log);  
    },
    
    deleteServer: function(server) {
        qwest.delete(server._links.self.href, null, {
            "headers": {"Authorization": getAuthorizationHeader()}
        })
        .then(function(xhr, response) {
            this.flux.actions.fetchTasks();
            this.flux.actions.fetchServers();
            this.flux.actions.fetchSubscriptions();
        }.bind(this))
        .catch(console.log);
    }
};