var express = require('express');
var superagent = require('superagent');
var querystring = require('querystring');
var app = express();

app.get('/', function (req, res) {
    res.send({'response_type': 'in_channel'});
    console.log(req.query);

    var hostPrefix = '';
    switch(req.query.command) {
        case '/giphy':
        case '/image':
        case '/google':
            hostPrefix = '4zshsx6vlh';
            break;
        case '/geo':
            hostPrefix = 'j8jqi56gye';
            break;
    }
    var uri = 'https://' + hostPrefix + '.execute-api.us-west-2.amazonaws.com/prod' + req.query.command + '?' + querystring.stringify(req.query);
    console.log(uri);

    superagent
        .get(uri)
        .set('Content-type', 'application/json')
        .set('X-Amz-Invocation-Type', 'Event')      // Magic lambda async enable flag, but we don't need it since we've sent Slack packing several lines of code ago.
        .end(function(err, res) {
            console.log("Posted successfully!");
        });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
