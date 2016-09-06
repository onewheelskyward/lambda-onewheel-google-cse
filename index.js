const querystring = require('querystring');
var google = require('googleapis');
var customsearch = google.customsearch('v1');

var GoogleSearch = require('google-search');
var googleSearch = new GoogleSearch({
    key: 'AIzaSyAlTbxqcZOlb3M-QXR4PCYpS2U1rfgwSlU',
    cx: '016450909327860943906:3a3e35xbkzu'
});


exports.handler = function(event, context) {
    //Echo back the text the user typed in
    // context.succeed('You sent: ' + event.text
    var query = querystring.parse(event['body-json']);
    console.log(query);
    console.log(context);
    googleSearch.build({
        q: query.text,
        num: 10 // Number of search results to return between 1 and 10, inclusive
    }, function(error, response) {
        console.log(response);
        context.succeed({
            response_type: 'in_channel',
            text: response.items[0].link,
            atachments: [{
                text: response.items[0].title + ': ' + response.items[0].snippet
            }]
        });
    });
};
