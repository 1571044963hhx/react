import request from "../../../utils/request";

// 项目用户相关的请求地址
const API = {
    GETSKU_URL: '/admin/product/list/',
    CANCELSALE_URL: '/admin/product/cancelSale/',
    ONSALE_URL: '/admin/product/onSale/',
    // 获取sku的详细信息
    GETSKUINFO_URL: '/admin/product/getSkuInfo/',
    DELETE_URL: '/admin/product/deleteSku/'
};

export const reqGetSku = (page, limit) => request.get(API.GETSKU_URL + `${page}/${limit}`);
export const reqOnSale = (skuid) => request.get(API.ONSALE_URL + skuid);
export const reqCancelSale = (skuid) => request.get(API.CANCELSALE_URL + skuid);
// 获取sku的详细信息
export const reqGetSkuInfo = (skuid) => request.get(API.GETSKUINFO_URL + skuid);
export const reqDelete = (skuid) => request.delete(API.DELETE_URL + skuid);
