/*
 * @FilePath: /client-api-doc-admin/src/api/module/keyGroup.js
 * @Description:
 */
import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

//
// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })

// 增加

export const handle_create = (params, url = "/keyGroup/create") =>
  axios.post(`${prefix}${url}`, params);
// 删除
export const handle_delete = (params, url = "/keyGroup/delete") =>
  axios.post(`${prefix}${url}`, params);

//修改
export const handle_update = (params, url = "/keyGroup/update") =>
  axios.post(`${prefix}${url}`, params);

//查询所有组数据

export const handle_read = (params, url = "/keyGroup/all") =>{
  const default_params = {
    currentPage: 1,
    pageSize: 10000,
  }
 return axios.get(`${prefix}${url}`, { params: { ...default_params,...params } });
}
//详情

export const handle_info = (params, url = "/keyGroup/info") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
