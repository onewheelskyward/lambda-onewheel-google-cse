var superagent = require('superagent');
var GoogleSearch = require('google-search');
var googleSearch = new GoogleSearch({
    key: 'AIzaSyAlTbxqcZOlb3M-QXR4PCYpS2U1rfgwSlU',
    cx: '016450909327860943906:3a3e35xbkzu'
});

exports.handler = function(event, context) {
    const message = JSON.parse(event.Records[0].Sns.Message);
    console.log('From SNS:', message);
    console.log(context);
    googleSearch.build({
        q: message.text,
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
            .post(message.response_url)
            .send(success)
            .set('Content-type', 'application/json')
            .end(function(err, res) {
                console.log("Posted successfully!");
                context.succeed();
            });
    });
};
