const https = require('node:https');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, resolve);
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

exports.handler = async (event, context) => {
  const text = event.Records[0].body;
  const payload = {
    channel: 'My Channel',
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": text,
        }
      },
    ],
  };

  const options = {
    hostname: 'slack.com',
    port: 443,
    path: '/api/chat.postMessage',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer Token'
    }
  };

  const res = await request(
    options,
    JSON.stringify(payload),
  );
  console.log('statusCode:', res.statusCode);

  return { statusCode: 200, body: 'OK' };
};