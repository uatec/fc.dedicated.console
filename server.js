var express = require('express');
var app = express();
var _ = require('lodash');




var envVars = '<script>GLOBAL = {}; GLOBAL.env=' + JSON.stringify(_.pick(process.env, [
    'auth0clientId',
    'auth0domain',
    'API_URL'
])) + '</script>';


app.get('/', function (request, response) {
    response.send(
        "<html>" +
            "<head>" +
                envVars +
                "<style>* {font-family: Roboto, sans-serif} html, body { margin: 0px }</style>" +
            "</head>" +
            "<body>" +
                "<div id='content' />" +
                "<script src='/js/bundle.js'></script>" +
            "</body>" +
        "</html>");
});

app.use(express.static('public'));

app.listen(process.env.PORT || 8081);