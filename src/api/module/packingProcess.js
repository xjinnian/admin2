import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

//
// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })

// 增加

export const handle_create = (params, url = "/packingProcess/create") =>
  axios.post(`${prefix}${url}`, params);
// 删除
export const handle_delete = (params, url = "/packingProcess/delete") =>
  axios.post(`${prefix}${url}`, params);

//修改
export const handle_update = (params, url = "/packingProcess/update") =>
  axios.post(`${prefix}${url}`, params);

//查询

export const handle_read = (params, url = "/packingProcess/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
//详情

export const handle_info = (params, url = "/packingProcess/info") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });



  export const handle_refresh = (params, url = "/packingProcess/refresh") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
