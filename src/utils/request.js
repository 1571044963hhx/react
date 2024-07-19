import axios from 'axios';
// import { message } from 'antd';
// import { useUserStore } from '../store/user'; // 假设你使用了某种状态管理库，比如 Redux

const request = axios.create({
    baseURL: process.env.VITE_APP_BASE_API, // 基础路径
    timeout: 50000,
});

const cancelSource = axios.CancelToken.source();

// 请求拦截器
request.interceptors.request.use((config) => {
    console.log(config)
    return config;

});

// 响应拦截器
request.interceptors.response.use((response) => {
    return response.data;
});

export { cancelSource };

export default request;
