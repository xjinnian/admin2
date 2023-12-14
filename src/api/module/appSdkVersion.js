import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;



// 增加

export const handle_create = (params, url = "/appSdkVersion/create") =>
  axios.post(`${prefix}${url}`, params);
// 删除
export const handle_delete = (params, url = "/appSdkVersion/delete") =>
  axios.post(`${prefix}${url}`, params);

//修改
export const handle_update = (params, url = "/appSdkVersion/update") =>
  axios.post(`${prefix}${url}`, params);

//查询

export const handle_read = (params, url = "/appSdkVersion/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
//详情

export const handle_info = (params, url = "/appSdkVersion/info") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
