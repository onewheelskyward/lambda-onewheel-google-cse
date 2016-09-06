const querystring = require('querystring');
var google = require('googleapis');
var customsearch = google.customsearch('v1');

exports.handler = function(event, context) {
    //Echo back the text the user typed in
    // context.succeed('You sent: ' + event.text
    var query = querystring.parse(event['body-json']);
    console.log(query);
    console.log(context);
    context.succeed({response_type: 'in_channel', text: 'Googling for ' + query.text});
};
