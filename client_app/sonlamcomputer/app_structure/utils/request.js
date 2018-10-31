import axios from "axios";
import { API_URL } from "../config";

export const request = (
  opts = {},
) => {
    console.log("Api: ", API_URL)
    // let token = localStorage.getItem("token")
    let headers = {
        ...opts
    }

    // if (token) headers = {
    //     ...headers, 
    //     Authorization: `Bearer ${token}`
    // }

    const defaultOptions = {
        headers,
        timeout: 5000
    }
    /*
    |--------------------------------------------------
    | Custom axios api
    |--------------------------------------------------
    */

    console.log(defaultOptions)
    
    const axiosApi = axios.create({
        baseURL: API_URL,
        ...defaultOptions,
    });

    return axiosApi;
};

export default request;
