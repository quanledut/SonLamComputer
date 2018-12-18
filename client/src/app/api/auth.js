import request from '../utils/request'
import { handleUnauthorized } from '../utils/handleAuthError'


const loginApi = (username, password) =>
    request()
        .post("/users/login", {username, password})
        .then((response) => response.data)
        .catch((err) => {
          handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
        })

const registerApi = (username, email, password) =>
    request()
        .post("/users/register", {username, email, password})
        .then((response) => response.data)
        .catch((err) => {
                      handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
        })

export {loginApi, registerApi}