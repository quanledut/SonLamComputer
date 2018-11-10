import request from '../utils/request'

const findAll = (query) => 
    request()
        .get("/computerTypes", {
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
        .delete(`/computerTypes/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            console.log(err); throw new Error(err.response.data.msg)
        });

const addApi = (data) => 
request()
    .post("/computerTypes",data)
    .then((response) => response.data)
    .catch((err) => {
        console.log(err); throw new Error(err.response.data.msg)
    });

const findByIdApi = (id) => 
request()
    .get(`/computerTypes/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        console.log(err); throw new Error(err.response.data.msg)
    });

const updateApi = (data) => 
request()
    .put(`/computerTypes/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        console.log(err); throw new Error(err.response.data.msg)
    });
        
export {findAll, deleteApi, addApi, findByIdApi, updateApi}