import request from '../utils/request'

const findAll = () => 
    request()
        .get("/devices/deviceType")
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const deleteApi = (id) => 
    request()
        .delete(`/devices/deviceType/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const addApi = (data) => 
request()
    .post("/devices/deviceType",data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const findByIdApi = (id) => 
request()
    .get(`/devices/deviceType/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const updateApi = (data) => 
request()
    .put(`/devices/deviceType/${data.id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });
        
export {findAll, deleteApi, addApi, findByIdApi, updateApi}