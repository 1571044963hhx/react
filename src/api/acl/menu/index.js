// src/api.js
import request from "@/utils/request";

// 枚举地址
const API = {
    // 获取全部菜单与按钮的标识数据
    ALLPERMISSTION_URL: '/admin/acl/permission',
    // 给某一级菜单新增一个子菜单
    ADDMENU_URL: '/admin/acl/permission/save',
    // 更新某一个已有的菜单
    UPDATE_URL: '/admin/acl/permission/update',
    // 删除已有的菜单
    DELETEMENU_URL: '/admin/acl/permission/remove/',
};

// 获取菜单数据
export const reqAllPermisstion = () => request.get(API.ALLPERMISSTION_URL);

// 添加与更新菜单的方法
export const reqAddOrUpdateMenu = (data) => {
    if (data.id) {
        return request.put(API.UPDATE_URL, data);
    } else {
        return request.post(API.ADDMENU_URL, data);
    }
};

// 删除某一个已有的菜单
export const reqRemoveMenu = (id) => axios.delete(API.DELETEMENU_URL + id);
