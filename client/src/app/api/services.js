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
            throw new Error(err.response.data.msg)
        });

const deleteApi = (id) => 
    request()
        .delete(`/services/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data.msg)
        });

const addApi = (data) => 
request()
    .post("/services",data)
    .then((response) => response.data)
    .catch((err) => {
        if (err.response) throw new Error(err.response.data.msg)
        else throw new Error(err)
    });

const findByIdApi = (id) => 
request()
    .get(`/services/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data.msg)
    });

const updateApi = (data) => 
request()
    .put(`/services/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data.msg)
    });
                    
export {findAll, deleteApi, addApi, findByIdApi, updateApi}