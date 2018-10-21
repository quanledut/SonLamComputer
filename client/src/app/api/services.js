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
            throw err
        });

const deleteApi = (id) => 
    request()
        .delete(`/services/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const addApi = (data) => 
request()
    .post("/services",data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const findByIdApi = (id) => 
request()
    .get(`/services/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const updateApi = (data) => 
request()
    .put(`/services/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });
                    
export {findAll, deleteApi, addApi, findByIdApi, updateApi}