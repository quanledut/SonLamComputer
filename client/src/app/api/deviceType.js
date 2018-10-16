import request from '../utils/request'

const findAll = () => 
    request()
        .get("/deviceTypes")
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const deleteApi = (id) => 
    request()
        .delete(`/deviceTypes/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const addApi = (data) => 
request()
    .post("/deviceTypes",data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const findByIdApi = (id) => 
request()
    .get(`/deviceTypes/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const updateApi = (data) => 
request()
    .put(`/deviceTypes/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });
        
export {findAll, deleteApi, addApi, findByIdApi, updateApi}