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
            throw err
        });

const findByIdApi = (id) => 
request()
    .get(`/payments/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });

const updateApi = (data) => 
request()
    .put(`/payments/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        throw err
    });
                    
export {findAll, findByIdApi, updateApi}