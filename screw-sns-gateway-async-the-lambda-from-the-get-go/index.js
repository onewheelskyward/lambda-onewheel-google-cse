var express = require('express');
var superagent = require('superagent');
var querystring = require('querystring');
var app = express();

app.get('/', function (req, res) {
    res.send({'response_type': 'in_channel'});
    console.log(req.query);

    var uri = 'https://4zshsx6vlh.execute-api.us-west-2.amazonaws.com/prod/giphy?' + querystring.stringify(req.query);
    console.log(uri);

    superagent
        .get(uri)
        .set('Content-type', 'application/json')
        .set('X-Amz-Invocation-Type', 'Event')
        .end(function(err, res) {
            console.log("Posted successfully!");
        });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
