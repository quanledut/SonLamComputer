import request from '../utils/request'

const findAll = () => 
    request()
        .get("/payments")
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