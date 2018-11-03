import request from '../utils/request'

const findAllApi = () => 
    request()
        .get("/users")
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data)
        });

const deleteApi = (data) => 
    request()
        .delete(`/users/${data}`)
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data)
        });

const addApi = (data) => 
request()
    .post("/users",data)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });

const findByIdApi = (id) => 
request()
    .get(`/users/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });

const updateApi = (data) => 
request()
    .put(`/users/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });

export {findAllApi, deleteApi, addApi, findByIdApi, updateApi}
  