import axios from 'axios';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { ElMessage } from 'element-plus';

const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

instance.interceptors.request.use(config=>{
    const userStore = useUserStore()
    const token = userStore.userInfo.token;
    //在请求头中配置token
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
},error=>Promise.reject(error));

instance.interceptors.response.use(res=>res.data,   
    (error) => {
    if (error.response) {
      // 服务器返回状态码非 2xx
        if(error.response.status === 401) {
            const userStore = useUserStore()
            userStore.cleanUserInfo();
            ElMessage.error('token失效,请重新登录');
            router.replace('/login')
        }
        else {
            ElMessage.error(`请求失败：${error.response.status} ${error.response.statusText}`);
        }
    } else if (error.request) {
      // 请求已发出但未收到响应
      ElMessage.error("网络错误或请求超时，请稍后重试");
    } else {
      // 其他错误
      ElMessage.error(`请求错误：${error.message}`);
    }
    return Promise.reject(error);
  })

export default instance;