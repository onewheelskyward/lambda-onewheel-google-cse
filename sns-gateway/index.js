var aws = require('aws-sdk');

exports.handler = function(event, context) {
    // var bodyJson = event['body-json'];
    // console.log(bodyJson);
    console.log("context: " + JSON.stringify(context));
    console.log("event: " + JSON.stringify(event));
    console.log(JSON.stringify(event.queryStringParameters));
    var sns = new aws.SNS();
    var params = {
        Message: JSON.stringify(event.queryStringParameters),
        Subject: "giphy search for",
        TopicArn: "arn:aws:sns:us-west-2:268578439486:slackGiphySns"
    };
    sns.publish(params, function(err, data) {
        if (err) {
            console.log("Error!");
            console.log(err, err.stack);
        } // an error occurred
        else {
            console.log("Success!");
            console.log(data);
            context.succeed();
        }
    });
};
