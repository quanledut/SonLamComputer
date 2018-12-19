import request from '../utils/request'
import { handleUnauthorized } from '../utils/handleAuthError'


const findAll = (query) =>
    request()
        .get("/payments", {
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

const findByIdApi = (id) =>
request()
    .get(`/payments/${id}`)
    .then((response) => response.data)
    .catch((err) => {
                  handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
    });

const updateApi = (data) =>
request()
    .put(`/payments/${data._id}`, data)
    .then((response) => response.data)
    .catch((err) => {
                  handleUnauthorized(err, () => {
            console.log(err); throw new Error(err.response.data.msg)
          })
    });

export {findAll, findByIdApi, updateApi}