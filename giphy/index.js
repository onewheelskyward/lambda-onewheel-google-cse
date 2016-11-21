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
        q: 'giphy ' + event.queryStringParameters.text,
        fileType: 'gif',
        searchType: 'image',
        num: 10
    }, function(error, response) {
        console.log(response);

        var image = response.items[0].link.replace('200_s.gif', 'giphy.gif');   // This will take care of false static positives from google.
        success = {
            response_type: 'in_channel',
            text: image,
            attachments: {
                image_url: image
            }
        };
        console.log(success);
        console.log("Attempting to post to " + event.queryStringParameters.response_url);
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
