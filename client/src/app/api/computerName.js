import request from '../utils/request'

const findAll = () => 
    request()
        .get("/devices/computerName")
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const deleteApi = (id) => 
    request()
        .delete(`/devices/computerName/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const addApi = (data) => 
request()
    .post("/devices/computerName",data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const findByIdApi = (id) => 
request()
    .get(`/devices/computerName/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const updateApi = (data) => 
request()
    .put(`/devices/computerName/${data.id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });
        
export {findAll, deleteApi, addApi, findByIdApi, updateApi}