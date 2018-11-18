import request from '../utils/request'

const loginApi = (username, password) => 
    request({
        'Content-Type': 'application/json'
    })
        .post("/users/login", {username, password})
        .then((response) => response.data)
        .catch((err) => {
            console.log(username, password, err.response)
            throw new Error("Error")

        })

export {loginApi}