import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

instance.interceptors.request.use(config=>{
    return config;
},error=>Promise.reject(error));

instance.interceptors.response.use(res=>res.data, e=>{
    return Promise.reject(e);
})

export default instance;