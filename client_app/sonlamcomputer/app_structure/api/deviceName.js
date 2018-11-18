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
            console.log("Error", err.response.data); 
            throw new Error(err.response.data.message)
        });

const deleteApi = (id) => 
    request()
        .delete(`/devices/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            console.log(err); throw new Error(err.response.data.msg)
        });

const addApi = (data) => 
request()
    .post("/devices",data)
    .then((response) => response.data)
    .catch((err) => {
        console.log(err); throw new Error(err.response.data.msg)
    });

const findByIdApi = (id) => 
request()
    .get(`/devices/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        console.log(err); throw new Error(err.response.data.msg)
    });

const updateApi = (data) => 
request()
    .put(`/devices/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        console.log(err); throw new Error(err.response.data.msg)
    });
        
export {findAll, deleteApi, addApi, findByIdApi, updateApi}