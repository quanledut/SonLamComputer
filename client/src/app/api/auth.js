import request from '../utils/request'

const loginApi = (username, password) => 
    request()
        .post("/users/login", {username, password})
        .then((response) => response.data)
        .catch((err) => {
            console.log(err); throw new Error(err.response.data.msg)
        })

export {loginApi}