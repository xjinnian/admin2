import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

// 查询所有
export const handle_read = (params, url = "/componentKey/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });

// 查询文件历史
export const handle_read_doc_history = (params, url = "/componentDoc/findBy") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });

// 修改
export const handle_update = (params, url = "/componentKey/update") =>
  axios.post(`${prefix}${url}`, params);

// 组件文档上传
export const handle_upload = (params, url = "/openapi/componentDoc/upload") =>
  axios.post(`${process.env.API_BASEURL}${url}`, params, { headers: { 'Content-Type': 'multipart/form-data' } });
