import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

//
// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })

// 增加

export const handle_create = (params, url = "/b_sdk_mddocpool/create") =>
  axios.post(`${prefix}${url}`, params);
// 删除
export const handle_delete = (params, url = "/b_sdk_mddocpool/delete") =>
  axios.post(`${prefix}${url}`, params);

//修改
export const handle_update = (params, url = "/b_sdk_mddocpool/update") =>
  axios.post(`${prefix}${url}`, params);

//查询

export const handle_read = (params, url = "/b_sdk_mddocpool/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
//详情

export const handle_info = (params, url = "/b_sdk_mddocpool/info") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });

//禁用
export const handle_disable = (params, url = "/b_sdk_mddocpool/disable") =>
  axios.post(`${prefix}${url}`, params);

// 增加

export const handle_writerandcreate = (
  params,
  url = "/b_sdk_mddocpool/writerandcreate"
) => axios.post(`${prefix}${url}`, params);
