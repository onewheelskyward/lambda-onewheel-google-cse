var express = require('express');
var superagent = require('superagent');
var querystring = require('querystring');
var app = express();

app.get('/', function (req, res) {
    res.send({'response_type': 'in_channel'});
    console.log(req.query);

    var uribase = "https://az9f7qkazi.execute-api.us-west-2.amazonaws.com/prod/"
    var uri = uribase + "upload?uri=" + req.query.text
    var detectUri = uribase + "detect?bucket=rekognition-poc&filename="
    console.log(uri);

    superagent
        .post(uri)
        .set('Content-type', 'application/json')
        .set('X-Amz-Invocation-Type', 'Event')      // Magic lambda async enable flag, but we don't need it since we've sent Slack packing several lines of code ago.
        .end(function(err, res) {
            console.log("Posted successfully!");
            console.log(res.body);
            superagent.get(detectUri + res.body.filename)
            .end(function (err, res) {
                console.log("Res out");
                console.log(res.body);
                var slackResponse = {
                    response_type: 'in_channel',
                    text: ''
                };
                if (res.body == null) {
                    slackResponse.text = 'Null response, was that a gif?';
                } else if (res.body.message) {
                    slackResponse.text = res.body.message;
                } else {
                    res.body.Labels.forEach(function (label) {
                        slackResponse.text += label.Name + ': ' + parseFloat(label.Confidence).toFixed(1) + '%  ';
                    });
                }
                superagent.post(req.query.response_url)
                .send(slackResponse).end(function (err, res) {}) 
            });
        });
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});
