import request from '../utils/request'

const findAll = (query) => 
    request()
        .get("/devices", {
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
        .delete(`/devices/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data)
        });

const addApi = (data) => 
request()
    .post("/devices",data)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });

const findByIdApi = (id) => 
request()
    .get(`/devices/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });

const updateApi = (data) => 
request()
    .put(`/devices/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });
        
export {findAll, deleteApi, addApi, findByIdApi, updateApi}