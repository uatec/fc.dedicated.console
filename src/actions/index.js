var promise = require('promise');
var constants = require('../constants.js');
var qwest = require('qwest');

var api = "https://thawing-bayou-8432.herokuapp.com/";

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

module.exports = {
    
    createSubscription: function(token, plan, email)
    {
        var payload = {
            token: token,
            plan: plan,
            email: email
        };
        
        qwest.post(api + 'subscriptions', payload, {
            dataType: 'json'
        }).then(function() { 
            this.flux.actions.fetchTasks();
            this.flux.actions.fetchServers();
            this.flux.actions.fetchSubscriptions();
        }.bind(this)); 
    },
    
    fetchServers: function() {
        qwest.get(api + 'servers')
        .then(function(xhr, response) {
            var data = JSON.parse(response);
            var servers = '_embedded' in data ? 'servers' in data._embedded ? data._embedded.servers : [] : [];
            this.dispatch(constants.SERVERS_CHANGED, servers);
        }.bind(this))
        .catch(console.log);  
    },    
    
    fetchSubscriptions: function() {
        qwest.get(api + 'subscriptions')
        .then(function(xhr, response) {
            var data = JSON.parse(response);
            var subscriptions = '_embedded' in data ? 'subscriptions' in data._embedded ? data._embedded.subscriptions : [] : [];
            this.dispatch(constants.SUBSCRIPTIONS_CHANGE, subscriptions);
        }.bind(this))
        .catch(console.log);  
    },    
    
    fetchTasks: function() {
        qwest.get(api + 'tasks')
        .then(function(xhr, response) {
            var data = JSON.parse(response);
            var tasks = '_embedded' in data ? 'tasks' in data._embedded ? data._embedded.tasks : [] : [];
            this.dispatch(constants.TASKS_CHANGED, tasks);
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
                dataType: 'json'
            })
        .then(function(xhr, response) {
            this.flux.actions.fetchTasks();
            this.flux.actions.fetchServers();
            this.flux.actions.fetchSubscriptions();
        }.bind(this))
        .catch(console.log);  
    },
    
    deleteServer: function(server) {
        qwest.delete(server._links.self.href)
        .then(function(xhr, response) {
            this.flux.actions.fetchTasks();
            this.flux.actions.fetchServers();
            this.flux.actions.fetchSubscriptions();
        }.bind(this))
        .catch(console.log);
    }
};