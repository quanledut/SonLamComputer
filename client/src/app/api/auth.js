import request from '../utils/request'

const loginApi = (username, password) => 
    request()
        .post("/users/login", {username, password})
        .then((response) => response.data)
        .catch((err) => {
            console.log(err); throw new Error(err.response.data.msg)
        })

const registerApi = (username, fullname, email, password) => 
    request()
        .post("/users/register", {username, fullname, email, password})
        .then((response) => response.data)
        .catch((err) => {
            console.log(err); throw new Error(err.response.data.msg)
        })

export {loginApi, registerApi}