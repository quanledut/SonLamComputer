import request from '../utils/request'
import { handleUnauthorized } from '../utils/handleAuthError'


const findAll = (query) =>
    request()
        .get("/deviceTypes", {
            params: {
                ...query
            }
        })
        .then((response) => response.data)
        .catch((err) => {
                      handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
        });

const deleteApi = (id) =>
    request()
        .delete(`/deviceTypes/${id}`)
        .then((response) => response.data)
        .catch((err) => {
                      handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
        });

const addApi = (data) =>
request()
    .post("/deviceTypes",data)
    .then((response) => response.data)
    .catch((err) => {
                  handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
    });

const findByIdApi = (id) =>
request()
    .get(`/deviceTypes/${id}`)
    .then((response) => response.data)
    .catch((err) => {
                  handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
    });

const updateApi = (data) =>
request()
    .put(`/deviceTypes/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
                  handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
    });

export {findAll, deleteApi, addApi, findByIdApi, updateApi}