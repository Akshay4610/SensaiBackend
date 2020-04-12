module.exports = {
    host: 'sensai.teedy.io',
    cookie: 'auth_token=121ae49b-fa96-48a0-b5cb-63f34d346bd6',
    api_base_uri: 'https://sensai.teedy.io/api/',
    user_auth_token: '',
    rest_api: {
        user: {
            create: {
                path: 'user?email=#e#&password=#p#&passwordconfirm=#c#&storage_quota=#s#&username=#u#',
                method: 'PUT',
                content_type: 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            login: {
                path: 'user/login?username=#u#&password=#p#',
                method: 'POST',
                content_type: 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            logout: {
                path: 'user/logout',
                method: 'POST',
                content_type: 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }
    }
}