import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

// 增加
export const handle_create = (params, url = "/themeTemplate/create") =>
  axios.post(`${prefix}${url}`, params);

// 修改
export const handle_update = (params, url = "/themeTemplate/update") =>
  axios.post(`${prefix}${url}`, params);

// 查询
export const handle_read = (params, url = "/themeTemplate/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });

// 查询
export const handle_read_all = (params, url = "/themeTemplate/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
