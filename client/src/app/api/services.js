import request from '../utils/request'

const findAll = (query) => 
    request()
        .get("/services", {
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
        .delete(`/services/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data)
        });

const addApi = (data) => 
request()
    .post("/services",data)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });

const findByIdApi = (id) => 
request()
    .get(`/services/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });

const updateApi = (data) => 
request()
    .put(`/services/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });
                    
export {findAll, deleteApi, addApi, findByIdApi, updateApi}