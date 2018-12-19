import request from '../utils/request'
import { handleUnauthorized } from '../utils/handleAuthError'


const findAll = (query) =>
    request()
        .get("/accessorys", {
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
        .delete(`/accessorys/${id}`)
        .then((response) => response.data)
        .catch((err) => {
                      handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
        });

const addApi = (data) =>
request()
    .post("/accessorys",data)
    .then((response) => response.data)
    .catch((err) => {
                  handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
    });

const findByIdApi = (id) =>
request()
    .get(`/accessorys/${id}`)
    .then((response) => response.data)
    .catch((err) => {
                  handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
    });

const historyImportApi = (id) =>
request()
    .get(`/accessorys/${id}/historyImport`)
    .then((response) => response.data)
    .catch((err) => {
                  handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
    });

const historyExportApi = (id) =>
request()
    .get(`/accessorys/${id}/historyExport`)
    .then((response) => response.data)
    .catch((err) => {
                  handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
    });


const updateApi = (data) =>
request()
    .put(`/accessorys/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
                  handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
    });

export {findAll, deleteApi, addApi, findByIdApi, updateApi, historyImportApi, historyExportApi}