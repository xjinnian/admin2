/*
 *
 *
 * @LastEditTime: 2022-07-29 16:14:46
 * @LastEditors: Please set LastEditors
 *
 * @FilePath: \sports-rules-admin\src\api\module\clientLanguage.js
 */

import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1 + "/clientLanguage/";

//
// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })

export const handle_read = (params, url = "read") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
export const handle_create = (params, url = "create") =>
  axios.post(`${prefix}${url}`, params);

export const handle_update = (params, url = "update") =>
  axios.post(`${prefix}${url}`, params);

export const handle_delete = (params, url = "delete") =>
  axios.post(`${prefix}${url}`, params);
