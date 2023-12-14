import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

//
// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })

// 增加

export const handle_create = (params, url = "/b_sdk_menu/create") =>
  axios.post(`${prefix}${url}`, params);
// 删除
export const handle_delete = (params, url = "/b_sdk_menu/delete") =>
  axios.post(`${prefix}${url}`, params);

//修改
export const handle_update = (params, url = "/b_sdk_menu/update") =>
  axios.post(`${prefix}${url}`, params);

//查询

export const handle_read = (params, url = "/b_sdk_menu/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
//详情

export const handle_info = (params, url = "/b_sdk_menu/info") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });

//禁用
export const handle_disable = (params, url = "/b_sdk_menu/disable") =>
  axios.post(`${prefix}${url}`, params);

//获取子节点

export const handle_children = (params, url = "/b_sdk_menu/children") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
