import request from '../utils/request'

const findAll = () => 
    request()
        .get("/roles")
        .then((response) => response.data)
        .catch((err) => {
            throw err
        });
