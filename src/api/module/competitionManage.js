import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

// 增加
export const handle_create = (params, url = "/competitionManage/create") =>
  axios.post(`${prefix}${url}`, params);

// 删除
export const handle_delete = (params, url = "/competitionManage/delete") =>
  axios.post(`${prefix}${url}`, params);

// 修改
export const handle_update = (params, url = "/competitionManage/update") =>
  axios.post(`${prefix}${url}`, params);

// 查询
export const handle_read = (params, url = "/competitionManage/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });

// 通过MID查详情
export const findOneByCidApi = (cid, url = "/competitionManage/findOneByCid") =>
  axios.get(`${prefix}${url}`, { params: { cid } });
