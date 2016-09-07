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
        q: 'giphy ' + query.text,
        searchType: 'image',
        num: 10
    }, function(error, response) {
        console.log(response);
        var image = '';
        console.log("pre-Item!");
        response.items.forEach(function(r) {
            console.log("Item!");
            console.log(r);
            if (r.mime == 'image/gif') {
                console.log("Found gif, proceeding");
                success = {
                    response_type: 'in_channel',
                    text: r.link
                };
                console.log(success);
                context.succeed(success);
            }
        });

    // # do some math on the image to make sure we get the animated gif here.
    //         if image
    //     if image['link'][/200_s.gif$/]
    //         image['link'].gsub! /200_s.gif/, 'giphy.gif'
    //     end

    });
};
