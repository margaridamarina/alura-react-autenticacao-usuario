import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:3006',
    headers: {
        Accept: 'application/json',
        Content: 'application/json'
    }
})

http.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('token')
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {
    console.log('Erro no interceptor do axios')
    return Promise.reject(error)
})

export default http