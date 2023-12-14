import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

//
// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })

// 增加

export const handle_create = (params, url = "/i18nKey/create") =>
  axios.post(`${prefix}${url}`, params);
// 删除
export const handle_delete = (params, url = "/i18nKey/delete") =>
  axios.post(`${prefix}${url}`, params);

//修改
export const handle_update = (params, url = "/i18nKey/update") =>
  axios.post(`${prefix}${url}`, params);

//查询

export const handle_read = (params, url = "/i18nKey/all") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
//详情

export const handle_info = (params, url = "/i18nKey/info") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });

export const hadle_flush_imgdesc_api = () =>
  axios.get(`${prefix}/i18nKey/flush_imgdesc`);
