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

    if (event.queryStringParameters.user_name == 'adam_the_okay') {
        var images = ['https://i.ytimg.com/vi/ZXsQAXx_ao0/maxresdefault.jpg', 'https://i.ytimg.com/vi/Alt0SKEL84M/maxresdefault.jpg', 'https://i.ytimg.com/vi/6AnAhdN9nDg/maxresdefault.jpg', 'https://i.ytimg.com/vi/Z6gG3tKDBlk/maxresdefault.jpg', 'http://cdn0.techly.com.au/wp-content/uploads/2015/06/shia.jpg', 'http://cdn.wallpapersafari.com/46/91/DumWsy.jpg', 'https://metrouk2.files.wordpress.com/2015/06/shia-labeouf.png', 'https://media.giphy.com/media/wErJXg1tIgHXG/giphy.gif', 'https://media3.giphy.com/media/esZGs2BiaIJcA/giphy.gif'];
        var image = images[Math.floor(Math.random() * images.length)];
        success = {
            response_type: 'in_channel',
            text: image
        };
        superagent
            .post(event.queryStringParameters.response_url)
            .send(success)
            .set('Content-type', 'application/json')
            .end(function (err, res) {
                console.log("Posted successfully!");
                context.succeed({
                    statusCode: 200,
                    headers: {},
                    body: ''
                });
            });
    } else {

        googleSearch.build({
            q: event.queryStringParameters.text,
            searchType: 'image',
            num: 10
        }, function (error, response) {
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
                .end(function (err, res) {
                    console.log("Posted successfully!");
                    context.succeed({
                        statusCode: 200,
                        headers: {},
                        body: ''
                    });
                });
        });
    }
};
