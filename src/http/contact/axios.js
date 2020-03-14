import axios from "axios";
import {loading,success,fail} from "@/util/toast"
import api from "./api"
const contact = axios.create({
    baseURL:"http://localhost:9000/api",
    timeout:15000
})


contact.interceptors.request.use(function (config) {
    loading();
    api.beforeReq && api.beforeReq()
    return config;
});

contact.interceptors.response.use(function (response) {
    success();
    api.AfterReq && api.AfterReq()
    return response;
}, function (error) {
    fail();
    api.AfterReq && api.AfterReq()
    return Promise.reject(error);
});


export default contact