import request from "../../utils/request";

// 项目用户相关的请求地址
const API = {
    LOGIN_URL: '/admin/acl/index/login',
    USERINFO_URL: '/admin/acl/index/info',
    LOGOUT_URL: '/admin/acl/index/logout'
};

// 登录接口
export const reqLogin = (data) => request.post(API.LOGIN_URL, data);

// 获取用户信息
export const reqUserInfo = () => request.get(API.USERINFO_URL);

// 退出登录
export const reqLogout = () => request.post(API.LOGOUT_URL);
