import request from "../../../utils/request";

// 项目用户相关的请求地址
const API = {
    TRADEMARK_URL: '/admin/product/baseTrademark/',
    // 添加品牌
    ADDTRADEMARK_URL: '/admin/product/baseTrademark/save',
    // 修改已有品牌
    UPDATETRADEMARK_URL: '/admin/product/baseTrademark/update',
    // 删除已有品牌
    DELETETRADEMARK_URL: '/admin/product/baseTrademark/remove/',
};

// 获取已有品牌的接口方法
// page: 获取第几页 ---默认第一页
// limit: 获取几个已有品牌的数据
export const reqHasTrademark = (page, limit) => request.get(API.TRADEMARK_URL + `${page}/${limit}`);

// 添加与修改已有品牌接口方法
export const reqAddOrUpdateTrademark = (data) => {
    // 修改已有品牌的数据
    if (data.id) {
        return request.put(API.UPDATETRADEMARK_URL, data);
    } else {
        // 新增品牌
        return request.post(API.ADDTRADEMARK_URL, data);
    }
};

// 删除已有品牌的接口方法
export const reqDeleteTrademark = (id) => request.delete(API.DELETETRADEMARK_URL + id);
