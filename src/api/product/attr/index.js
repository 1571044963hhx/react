import request from "../../../utils/request"

// 项目用户相关的请求地址
const API = {
    C1_URL: '/admin/product/getCategory1',
    C2_URL: '/admin/product/getCategory2/',
    C3_URL: '/admin/product/getCategory3/',
    ATTR_URL: '/admin/product/attrInfoList/',
    // 添加或者修改已有的属性的接口
    ADDORUPDATEATTR_URL: '/admin/product/saveAttrInfo',
    // 删除某一个已有的属性
    DELETEATTR_URL: '/admin/product/deleteAttr/',
};

export const reqC1 = () => request.get(API.C1_URL);
export const reqC2 = (category1Id) => request.get(API.C2_URL + category1Id);
export const reqC3 = (category2Id) => request.get(API.C3_URL + category2Id);

// 获取属性值，需要3个数据的ID
export const reqAttr = (category1Id, category2Id, category3Id) =>
    request.get(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`);

// 新增或者修改已有的属性接口
export const reqAddOrUpdateAttr = (data) =>
    request.post(API.ADDORUPDATEATTR_URL, data);

// 删除某一个已有的属性业务
export const reqRemoveAttr = (attrId) =>
    request.delete(API.DELETEATTR_URL + attrId);
