import request from '../utils/request'

const findCollectionNames = () => 
    request()
        .get('/roles/collectionNames')
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data)
        })

const findAll = () => 
    request()
        .get("/roles")
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data)
        });

const deleteApi = (id) => 
    request()
        .delete(`/roles/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data)
        });

const addApi = (data) => 
request()
    .post("/roles",data)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });

const findByIdApi = (id) => 
request()
    .get(`/roles/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });

const updateApi = (data) => 
request()
    .put(`/roles/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });
        
export {findAll, deleteApi, addApi, findByIdApi, updateApi, findCollectionNames}