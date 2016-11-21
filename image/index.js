var superagent = require('superagent');
var GoogleSearch = require('google-search');
var googleSearch = new GoogleSearch({
    key: process.env.CSE_KEY,
    cx: process.env.CSE_CX
});

exports.handler = function(event, context) {
    // const message = JSON.parse(event.Records[0].Sns.Message);
    // console.log('From SNS:', message);
    // console.log(context);
    console.log(event.queryStringParameters);
    console.log("Keys: " + process.env.CSE_KEY + ", " + process.env.CSE_CX);

    googleSearch.build({
        q: event.queryStringParameters.text,
        searchType: 'image',
        num: 10
    }, function(error, response) {
        console.log(response);
        success = {
            response_type: 'in_channel',
            text: response.items[0].link
        };
        console.log(success);
        console.log("Posting to " + event.queryStringParameters.response_url);
        superagent
            .post(event.queryStringParameters.response_url)
            .send(success)
            .set('Content-type', 'application/json')
            .end(function(err, res) {
                console.log("Posted successfully!");
                context.succeed({
                    statusCode: 200,
                    headers: {},
                    body: ''
                });
            });
    });
};
