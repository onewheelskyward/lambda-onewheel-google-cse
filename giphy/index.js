const querystring = require('querystring');
var superagent = require('superagent');
var GoogleSearch = require('google-search');
var googleSearch = new GoogleSearch({
    key: 'AIzaSyAlTbxqcZOlb3M-QXR4PCYpS2U1rfgwSlU',
    cx: '016450909327860943906:3a3e35xbkzu'
});

exports.handler = function(event, context) {
    var query = querystring.parse(event['body-json']);
    console.log(query);
    console.log(context);
    googleSearch.build({
        q: 'giphy ' + query.text,
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
        // superagent
        //     .post(query.response_url)
        //     .send(success)
        //     .set('Content-type', 'application/json')
        //     .end(function(err, res) {
        //         console.log("Posted successfully!");
        //         context.success();
        //     });
    });
};
