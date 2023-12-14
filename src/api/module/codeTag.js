import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

// 增加
export const handle_create = (params, url = "/codeTag/create") =>
  axios.post(`${prefix}${url}`, params);

//查询
export const handle_read = (params, url = "/codeTag/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
