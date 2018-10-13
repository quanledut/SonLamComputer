import request from '../utils/request'

const findAll = () => 
    request()
        .get("/devices/computerType")
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const deleteApi = (id) => 
    request()
        .delete(`/devices/computerType/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const addApi = (data) => 
request()
    .post("/devices/computerType",data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const findByIdApi = (id) => 
request()
    .get(`/devices/computerType/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const updateApi = (data) => 
request()
    .put(`/devices/computerType/${data.id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });
        
export {findAll, deleteApi, addApi, findByIdApi, updateApi}