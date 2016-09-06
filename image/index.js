const querystring = require('querystring');
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
        q: query.text,
        searchType: 'image',
        num: 10
    }, function(error, response) {
        console.log(response);
        success = {
            response_type: 'in_channel',
            text: response.items[0].link
        };
        console.log(success);
        context.succeed(success);
    });
};
