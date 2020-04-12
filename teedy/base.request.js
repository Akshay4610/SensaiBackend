const https = require('https');
const config = require('../config/teedy.config');
const q = require('q');




const options = (option) => {
    return {
        host: config.host,
        path: config.api_base_uri + option.path,
        method: option.method,
        headers: {
            "Content-Type": option.content_type,
            "Cookie": config.cookie,
            "Host": config.host,
        }
    };
}

const putData = (options, reqData) => {
    let defer = q.defer();
    let request;
    if (!options) {
        defer.reject();
        defer.reject({ status: 400, data: { message: 'Please specify the url to receive data'} });
    } else {

        request = https.request(options.path, options, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                    defer.reject({ status: resp.statusCode, data: JSON.parse(data) });
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            defer.reject({ status: 500, data: { message:  err.message} });
        });
    }
    request.on('error', (err) => {
        console.error(err);
        defer.reject({ status: 500, data: { message:  err.message} });
    });
    if (reqData != undefined) {
        const putData = JSON.stringify(reqData);
        request.write(putData);
    }
    request.end();
    return defer.promise;

}


module.exports = {
    options,
    putData,
}