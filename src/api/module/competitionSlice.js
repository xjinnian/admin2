import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

// 增加

export const handle_create = (params, url = "/competitionSlice/create") =>
  axios.post(`${prefix}${url}`, params);
// 删除
export const handle_delete = (params, url = "/competitionSlice/delete") =>
  axios.post(`${prefix}${url}`, params);

//修改
export const handle_update = (params, url = "/competitionSlice/update") =>
  axios.post(`${prefix}${url}`, params);

//查询

export const handle_read = (params, url = "/competitionSlice/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
//详情

export const handle_info = (params, url = "/competitionSlice/info") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
