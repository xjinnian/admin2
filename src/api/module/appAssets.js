/*
 * @FilePath: /client-api-doc-admin/src/api/module/oss.js
 * @Description: app资源管理
 */
import axios from "src/api/commom/axioswapper.js";
const OSS_URL = 'https://api.sportxxxwo8.com/file/fastdfs/upload/file'

let prefix = process.env.API_PREFIX_1;

// 扫描
export const handle_scan = (params,url = "/appAssets/scan") =>
  axios.post(`${prefix}${url}`,  params);

// 上传到oss
export const handle_upload_oss = (params) =>
  axios.post(`${OSS_URL}`,  params);


//appAssets资源列表接口
export const handle_read = (params, url = "/appAssets/index") =>
  axios.get(`${prefix}${url}`,  { params: { ...params } });

//appAssets资源添加接口
export const handle_create = (params, url = "/appAssets/create") =>
  axios.post(`${prefix}${url}`, params);

//appAssets资源修改接口
export const handle_update = (params, url = "/appAssets/update") =>
  axios.post(`${prefix}${url}`, params);

//appAssets资源删除接口
export const handle_delete = (params, url = "/appAssets/delete") =>
  axios.post(`${prefix}${url}`, params);
