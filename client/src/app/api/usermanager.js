import request from '../utils/request'

const getListUserApi = () => 
    request()
        .get("/usermanagers")
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const deleteUserApi = (data) => 
    request()
        .delete(`/usermanagers/${data}`)
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });

const addUserApi = (username, email, fullname, address, phone, roles, created_time, password, gender) => 
request()
    .post("/usermanagers",{username, email, fullname, address, phone, roles, created_time, password, gender})
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const getListUserByIdApi = (id) => 
request()
    .get(`/usermanagers/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const updateUserApi = (data) => 
request()
    .put(`/usermanagers/${data.id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

export {getListUserApi, deleteUserApi, addUserApi, getListUserByIdApi, updateUserApi}
  