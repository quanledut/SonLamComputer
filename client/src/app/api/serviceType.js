import request from '../utils/request'

const findAll = (query) => 
    request()
        .get("/serviceTypes", {
            params: {
                ...query
            }
        })
        .then((response) => response.data)
        .catch((err) => {
            console.log(err); throw new Error(err.response.data.msg)
        });

const deleteApi = (id) => 
    request()
        .delete(`/serviceTypes/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            console.log(err); throw new Error(err.response.data.msg)
        });

const addApi = (data) => 
request()
    .post("/serviceTypes",data)
    .then((response) => response.data)
    .catch((err) => {
        console.log(err); throw new Error(err.response.data.msg)
    });

const findByIdApi = (id) => 
request()
    .get(`/serviceTypes/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        console.log(err); throw new Error(err.response.data.msg)
    });

const updateApi = (data) => 
request()
    .put(`/serviceTypes/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        console.log(err); throw new Error(err.response.data.msg)
    });
        
export {findAll, deleteApi, addApi, findByIdApi, updateApi}