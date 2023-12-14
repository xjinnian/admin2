/*
 * @FilePath: /client-api-doc-admin/src/api/module/keyConfigRecord.js
 * @Description:
 */
import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

//
// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })

// 增加

export const handle_create = (params, url = "/keyConfigRecord/create") =>
  axios.post(`${prefix}${url}`, params);
// 删除
export const handle_delete = (params, url = "/keyConfigRecord/delete") =>
  axios.post(`${prefix}${url}`, params);

//修改
export const handle_update = (params, url = "/keyConfigRecord/update") =>
  axios.post(`${prefix}${url}`, params);

  // 刷新图片域名
export const handle_flush_imgUrl = (params, url = "/keyConfigRecord/handle_flush_imgUrl") =>
axios.post(`${prefix}${url}`, params);

//查询

export const handle_read = (params, url = "/keyConfigRecord/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
//详情

export const handle_info = (params, url = "/keyConfigRecord/info") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
