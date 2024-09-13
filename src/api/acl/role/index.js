import request from '@/utils/request';

const API = {
    GETROLE_URL: '/admin/acl/role/',
    ADDROLE_URL: '/admin/acl/role/save',
    UPDATAROLE_URL: '/admin/acl/role/update',
    SETPERMISSION_URL: '/admin/acl/permission/toAssign/',
    SETPERMISTION_URL: '/admin/acl/permission/doAssign/?',
    REMOVEROLE_URL: '/admin/acl/role/remove/',
};

export const reqGetRole = (page, limit, roleName) =>
    request.get(`${API.GETROLE_URL}${page}/${limit}/?roleName=${roleName}`);

export const reqAddRole = (data) =>
    request.post(API.ADDROLE_URL, data);

export const reqUpdataRole = (data) =>
    request.put(API.UPDATAROLE_URL, data);

export const reqSetPermission = (roleId) =>
    request.get(`${API.SETPERMISSION_URL}${roleId}`);

export const reqSetPermisstion = (roleId, permissionId) =>
    request.post(
        `${API.SETPERMISTION_URL}roleId=${roleId}&permissionId=${permissionId}`
    );

export const reqRemoveRole = (roleId) =>
    request.delete(`${API.REMOVEROLE_URL}${roleId}`);
