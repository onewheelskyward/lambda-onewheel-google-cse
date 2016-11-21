var superagent = require('superagent');
var GoogleSearch = require('google-search');
var googleSearch = new GoogleSearch({
    key: process.env.CSE_KEY,
    cx: process.env.CSE_CX
});

exports.handler = function(event, context) {
    console.log(event.queryStringParameters);
    console.log("Keys: " + process.env.CSE_KEY + ", " + process.env.CSE_CX);
    googleSearch.build({
        q: event.queryStringParameters.text,
        num: 10 // Number of search results to return between 1 and 10, inclusive
    }, function(error, response) {
        console.log(response);
        success = {
            response_type: 'in_channel',
            text: response.items[0].link,
            attachments: [{
                text: response.items[0].title + ': ' + response.items[0].snippet
            }]
        };
        console.log(success);
        superagent
            .post(event.queryStringParameters.response_url)
            .send(success)
            .set('Content-type', 'application/json')
            .end(function(err, res) {
                console.log("Posted successfully!");
                context.succeed();
            });
    });
};
