const config = require("../config/teedy.config");
const baseRequest = require("./base.request");

const createUser = (request, response) => {
//(email, password, passwordconfirm, storage_quota, username) => {
    let options = baseRequest.options(config.rest_api.user.create);
    options.path = options.path.replace('#e#', request.body.email);
    options.path = options.path.replace('#p#', request.body.password);
    options.path = options.path.replace('#c#', request.body.passwordConfirm);
    options.path = options.path.replace('#s#', parseInt(request.body.storageQuotaMB));
    options.path = options.path.replace('#u#', request.body.userName);

    baseRequest.putData(options, undefined).then(function (result) {
        response.status(result.status).json(result.data);
    }).catch(function (err) {
        console.log(err);
        response.status(err.status).json(err.data);
    });
}

module.exports = {
    createUser
}