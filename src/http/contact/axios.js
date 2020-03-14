import axios from "axios";
const contact = axios.create({
    baseURL:"http://localhost:9000/api",
    timeout:15000
})


contact.interceptors.request.use(function (config) {
    return config;
});

contact.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});


export default contact