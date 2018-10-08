import axios from "axios";
import { API_URL } from "./../../app/config";

export const request = (
  opts = {},
) => {

    let token = localStorage.getItem("token")
    let headers = {
        ...opts
    }

    if (token) headers = {
        ...headers, 
        Authorization: `Bearer ${token}`
    }

    const defaultOptions = {
        headers,
        timeout: 9000
    }
    /*
    |--------------------------------------------------
    | Custom axios api
    |--------------------------------------------------
    */
    const axiosApi = axios.create({
        baseURL: API_URL,
        ...defaultOptions,
    });

    return axiosApi;
};

export default request;
