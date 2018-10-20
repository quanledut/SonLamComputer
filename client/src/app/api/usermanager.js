import request from '../utils/request'

const findAllApi = () => 
    request()
        .get("/users")
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const deleteApi = (data) => 
    request()
        .delete(`/users/${data}`)
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const addApi = (data) => 
request()
    .post("/users",data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const findByIdApi = (id) => 
request()
    .get(`/users/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const updateApi = (data) => 
request()
    .put(`/users/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

export {findAllApi, deleteApi, addApi, findByIdApi, updateApi}
  