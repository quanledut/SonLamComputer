import request from '../utils/request'

const findAllApi = () => 
    request()
        .get("/usermanagers")
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const deleteApi = (data) => 
    request()
        .delete(`/usermanagers/${data}`)
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const addApi = (data) => 
request()
    .post("/usermanagers",data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const findByIdApi = (id) => 
request()
    .get(`/usermanagers/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const updateApi = (data) => 
request()
    .put(`/usermanagers/${data.id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

export {findAllApi, deleteApi, addApi, findByIdApi, updateApi}
  