import request from '../utils/request'

const loginApi = (username, password) => 
    request()
        .post("/users/login", {username, password})
        .then((response) => response.data)
        .catch((err) => {
            throw err
        })

export {loginApi}