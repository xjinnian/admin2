import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

// 增加
export const handle_create = (params, url = "/layoutTemplate/create") =>
  axios.post(`${prefix}${url}`, params);

// 修改
export const handle_update = (params, url = "/layoutTemplate/update") =>
  axios.post(`${prefix}${url}`, params);

// 查询
export const handle_read = (params, url = "/layoutTemplate/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });


  //镜像
export const handle_mirror = (params, url = "/layoutTemplate/mirror") =>
axios.post(`${prefix}${url}`, params);
