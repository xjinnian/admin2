/*
 * @FilePath: /client-api-doc-admin/src/api/module/assetsKey.js
 * @Description:
 */
import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

//
// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })

// 增加

export const handle_create = (params, url = "/assetsKey/create") =>
  axios.post(`${prefix}${url}`, params);
// 删除
export const handle_delete = (params, url = "/assetsKey/delete") =>
  axios.post(`${prefix}${url}`, params);

//修改
export const handle_update = (params, url = "/assetsKey/update") =>
  axios.post(`${prefix}${url}`, params);

// 刷新图片域名
export const handle_flush_imgUrl = (params, url = "/assetsKey/handle_flush_imgUrl") =>
  axios.post(`${prefix}${url}`, params);

//查询

export const handle_read = (params, url = "/assetsKey/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
//详情

export const handle_info = (params, url = "/assetsKey/info") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });

export const hadle_flush_imgdesc_api = () =>
  axios.get(`${prefix}/assetsKey/flush_imgdesc`);
