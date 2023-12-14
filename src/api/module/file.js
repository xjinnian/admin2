/*
 *
 *
 * @Description    :
 */

import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

//禁用
export const handle_upload = (params, url = "/file/upload") =>
  axios.post(`${prefix}${url}`, params);

export const handle_read_md_file = (params, url = "") =>
  axios.get(`${url}`, { params: { ...params } });
