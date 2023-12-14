/*
 * @FilePath: /client-api-doc-admin/src/api/module/imgDescription.js
 * @Description:
 */
import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

//
// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })

// 刷新图片统计
export const handle_flush = (params, url = "/imgDescription/flush") =>
  axios.post(`${prefix}${url}`, params);
// 增加
export const handle_create = (params, url = "/imgDescription/create") =>
  axios.post(`${prefix}${url}`, params);

// 更新 imgDescs
export const updateImgDescsApi = (
  imgDescs,
  url = "/imgDescription/updateImgDescs"
) => axios.post(`${prefix}${url}`, { ...imgDescs });

// 删除
export const handle_delete = (params, url = "/imgDescription/delete") =>
  axios.post(`${prefix}${url}`, params);

//修改
export const handle_update = (params, url = "/imgDescription/update") =>
  axios.post(`${prefix}${url}`, params);

//查询
export const handle_read = (params, url = "/imgDescription/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });

export const findListByKeyApi = (
  params,
  url = "/imgDescription/findListByKey"
) => axios.get(`${prefix}${url}`, { params });

//详情

export const handle_info = (params, url = "/imgDescription/info") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
