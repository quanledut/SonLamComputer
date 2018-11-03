import request from '../utils/request'

const findAll = (query) => 
    request()
        .get("/payments", {
            params: {
                ...query
            }
        })
        .then((response) => response.data)
        .catch((err) => {
            throw new Error(err.response.data)
        });

const findByIdApi = (id) => 
request()
    .get(`/payments/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });

const updateApi = (data) => 
request()
    .put(`/payments/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw new Error(err.response.data)
    });
                    
export {findAll, findByIdApi, updateApi}