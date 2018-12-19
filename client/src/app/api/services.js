import request from '../utils/request'
import { handleUnauthorized } from '../utils/handleAuthError'


const findAll = (query) =>
    request()
        .get("/serviceFix", {
            params: {
                ...query
            }
        })
        .then((response) => response.data)
        .catch((err) => {
          handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
        });

const deleteApi = (id) =>
    request()
        .delete(`/serviceFix/${id}`)
        .then((response) => response.data)
        .catch((err) => {
          handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
        });

const addApi = (data) =>
request()
    .post("/serviceFix",data)
    .then((response) => response.data)
    .catch((err) => {
      handleUnauthorized(err, () => {
        console.log(err); throw new Error(err.response.data.msg)
      })
});

const findByIdApi = (id) =>
request()
    .get(`/serviceFix/${id}`)
    .then((response) => response.data)
    .catch((err) => {
      handleUnauthorized(err, () => {
        console.log(err); throw new Error(err.response.data.msg)
      })
});

const updateApi = (data) =>
request()
    .put(`/serviceFix/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
      handleUnauthorized(err, () => {
        console.log(err); throw new Error(err.response.data.msg)
      })
});

export {findAll, deleteApi, addApi, findByIdApi, updateApi}