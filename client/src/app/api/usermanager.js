import request from '../utils/request'
import { handleUnauthorized } from '../utils/handleAuthError'


const findAllApi = () =>
    request()
        .get("/users")
        .then((response) => response.data)
        .catch((err) => {
                      handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
        });

const deleteApi = (data) =>
    request()
        .delete(`/users/${data}`)
        .then((response) => response.data)
        .catch((err) => {
                      handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
        });

const addApi = (data) =>
request()
    .post("/users",data)
    .then((response) => response.data)
    .catch((err) => {
                  handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
    });

const findByIdApi = (id) =>
request()
    .get(`/users/${id}`)
    .then((response) => response.data)
    .catch((err) => {
                  handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
    });

const updateApi = (data) =>
request()
    .put(`/users/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
                  handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
    });

const changePasswordApi = (data) =>
request()
    .put(`/users/${data._id}/changePassword`, data)
    .then((response) => response.data)
    .catch((err) => {
                  handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
    });


export {findAllApi, deleteApi, addApi, findByIdApi, updateApi, changePasswordApi}
