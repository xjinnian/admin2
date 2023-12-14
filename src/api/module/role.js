/*
 * @FilePath: /client-api-doc-admin/src/api/module/role.js
 * @Description:
 */
import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;


//角色列表接口
export const handle_read = (params, url = "/role/index") =>
  axios.get(`${prefix}${url}`,  { params: { ...params } });

// 查角色详情
export const handle_info = (params, url = "/role/info") =>
axios.get(`${prefix}${url}`, { params: { ...params } });

//角色添加接口
export const handle_create = (params, url = "/role/create") =>
  axios.post(`${prefix}${url}`, params);

//角色修改接口
export const handle_update = (params, url = "/role/update") =>
  axios.post(`${prefix}${url}`, params);

//角色删除接口
export const handle_delete = (params, url = "/role/delete") =>
  axios.post(`${prefix}${url}`, params);
