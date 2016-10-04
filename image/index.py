import json
import boto3

def lambda_handler(event, context):
    print('Starting process')
    message = event['queryStringParameters']
    print(json.dumps(message))
    client = boto3.client('sns')
    response = client.publish(
        TargetArn = 'arn:aws:sns:us-west-2:268578439486:slackGoogleImage',
        Message   = json.dumps({'default': json.dumps(message)}),
        MessageStructure = 'json'
    )
    print(response)
    return {
        'statusCode': '200',
        'body': '',
        'headers': {
            'Content-Type': 'application/json',
        },
    }
