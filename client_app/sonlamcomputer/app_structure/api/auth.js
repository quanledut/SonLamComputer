import request from '../utils/request'

const loginApi = (username, password) => 
    request({
        'Content-Type': 'application/json'
    })
        .post("/users/login", {username, password})
        .then((response) => response.data)
        .catch((err) => {
            // throw new Error(err.response.data)
            throw new Error("Username hoặc password không hợp lệ")

        })

export {loginApi}