import request from '../utils/request'
import { handleUnauthorized } from '../utils/handleAuthError'


const findAll = (query) =>
    request()
        .get("/serviceSell", {
            params: {
                ...query
            }
        })
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data.msg)
        });

const deleteApi = (id) =>
    request()
        .delete(`/serviceSell/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data.msg)
        });

const addApi = (data) =>
request()
    .post("/serviceSell",data)
    .then((response) => response.data)
    .catch((err) => {
        if (err.response) throw new Error(err.response.data.msg)
        else throw new Error(err)
    });

const findByIdApi = (id) =>
request()
    .get(`/serviceSell/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data.msg)
    });

const updateApi = (data) =>
request()
    .put(`/serviceSell/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data.msg)
    });

export {findAll, deleteApi, addApi, findByIdApi, updateApi}