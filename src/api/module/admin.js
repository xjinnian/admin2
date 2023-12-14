import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;
//管理员登录接口
export const handle_login = (params, url = "/admin/login") =>
  axios.post(`${prefix}${url}`, params);

//管理员列表接口
export const handle_read = (params, url = "/admin/index") =>
  axios.get(`${prefix}${url}`,  { params: { ...params } });

//管理员添加接口
export const handle_create = (params, url = "/admin/create") =>
  axios.post(`${prefix}${url}`, params);

//管理员修改接口
export const handle_update = (params, url = "/admin/update") =>
  axios.post(`${prefix}${url}`, params);

//管理员删除接口
export const handle_delete = (params, url = "/admin/delete") =>
  axios.post(`${prefix}${url}`, params);
