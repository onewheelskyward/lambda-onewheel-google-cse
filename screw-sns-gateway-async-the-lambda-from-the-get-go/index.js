var express = require('express');
var superagent = require('superagent');
var app = express();

app.get('/', function (req, res) {
    res.send();
    console.log(req.query);
    var uri = 'https://4zshsx6vlh.execute-api.us-west-2.amazonaws.com/prod/giphy?text=' + req.query.text + '&response_url=' + req.query.response_url;
    console.log(uri);

    superagent
        .get(uri)
        .set('Content-type', 'application/json')
        .set('X-Amz-Invocation-Type', 'Event')
        .end(function(err, res) {
            console.log("Posted successfully!");
            context.succeed();
        });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
