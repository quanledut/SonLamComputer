import request from '../utils/request'

const findAll = (query) => 
    request()
        .get("/deviceTypes", {
            params: {
                ...query
            }
        })
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data)
        });

const deleteApi = (id) => 
    request()
        .delete(`/deviceTypes/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data)
        });

const addApi = (data) => 
request()
    .post("/deviceTypes",data)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });

const findByIdApi = (id) => 
request()
    .get(`/deviceTypes/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });

const updateApi = (data) => 
request()
    .put(`/deviceTypes/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });
        
export {findAll, deleteApi, addApi, findByIdApi, updateApi}