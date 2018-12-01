import request from '../utils/request'

const findAllApi = () => 
    request()
        .get("/customers")
        .then((response) => response.data)
        .catch((err) => {
            console.log(err); throw new Error(err.response.data.msg)
        });

const deleteApi = (data) => 
    request()
        .delete(`/customers/${data}`)
        .then((response) => response.data)
        .catch((err) => {
            console.log(err); throw new Error(err.response.data.msg)
        });

const addApi = (data) => 
request()
    .post("/customers",data)
    .then((response) => response.data)
    .catch((err) => {
        console.log(err); throw new Error(err.response.data.msg)
    });

const findByIdApi = (id) => 
request()
    .get(`/customers/${id}`)
    .then((response) => response.data)
    .catch((err) => {
        console.log(err); throw new Error(err.response.data.msg)
    });

const updateApi = (data) => 
request()
    .put(`/customers/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
        console.log(err); throw new Error(err.response.data.msg)
    });

// const changePasswordApi = (data) => 
// request()
//     .put(`/customers/${data._id}/changePassword`, data)
//     .then((response) => response.data)
//     .catch((err) => {
//         console.log(err); throw new Error(err.response.data.msg)
//     });


export {findAllApi, deleteApi, addApi, findByIdApi, updateApi}
  