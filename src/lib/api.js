const https = require('https');
var qs = require("querystring");

const request = (options) => {
    return new Promise((resolve, reject) => {
        let result = {};


        const request = https.request(options, response => {
            let chunks = [];

            response.on("data", chunk => chunks.push(chunk));

            response.on("end", () => {
                var body = Buffer.concat(chunks);
                result = JSON.parse(body);
                resolve(result);
            });
        });

        request.on('error', e => {
            result.status = 500;
            result.data = {
                message: 'ERROR: API response',
                exception: e
            };
            reject(result);
        });

        if(options.headers) {
            if(options.headers['content-type'] === 'application/x-www-form-urlencoded') {
                request.write(qs.stringify({ grant_type: 'client_credentials' }));
            }
        }
        

        request.end();

    });
}

module.exports.request = request;