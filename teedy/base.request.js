const https = require('https');
const config = require('../config/teedy.config');
const q = require('q');




const options = (option, cookie) => {
    let ck = config.cookie;
    if (cookie!= undefined) {
        ck = cookie;
    }
    return {
        host: config.host,
        path: config.api_base_uri + option.path,
        method: option.method,
        headers: {
            "Content-Type": option.content_type,
            "Cookie": ck,
            "Host": config.host,
        }
    };
}

const executeRequest = (options, reqData) => {
    let defer = q.defer();
    let request;
    if (!options) {
        defer.reject();
        defer.reject({ status: 400, data: { message: 'Please specify the url to receive data' } });
    } else {

        request = https.request(options.path, options, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                if (options.path.toString().indexOf('/login') != -1 && resp.statusCode == 200) {
                    const headers = JSON.stringify(resp.headers);
                    const jsonHeaders = JSON.parse(headers);
                    config.user_auth_token = jsonHeaders["set-cookie"][0].split(';')[0].split('=')[1];
                }
                defer.resolve({ status: resp.statusCode, data: JSON.parse(data) });
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            defer.reject({ status: 500, data: { message: err.message } });
        });
    }
    request.on('error', (err) => {
        console.error(err);
        defer.reject({ status: 500, data: { message: err.message } });
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
    executeRequest,
}