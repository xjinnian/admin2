/*
 * @FilePath: /client-api-doc-admin/src/pages/appAssets/config/index.js
 * @Description:
 */
import moment from "moment";

import { utils } from "src/boot/utils";
import { config } from "src/boot/config";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },

  {
    name: "name",
    required: true,
    label: "文件名",
    align: "left",
    field: 'name',
  },
  { name: "path", align: "left", label: "文件原路径", field: "path" },

  {
    name: "url",
    align: "left",
    label: "服务器地址",
    field: "url",
  },

  {
    name: "createdAt",
    align: "left",
    label: "创建时间",
    field: "createdAt",

    format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""),
  },
  {
    name: "updatedAt",
    align: "left",
    label: "更新时间",
    field: "updatedAt",
    format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""),
  },

  {
    name: "operator",
    align: "left",
    label: "操作人",
    field: "operator",
    style: "width: 160px",
  },
  {
    name: "handle",
    align: "left",
    label: "操作",
    field: "handle",
    style: "width: 160px",
  },
];
