/*
 * @FilePath: /client-api-doc-admin/src/pages/admin/config/index.js
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
    label: "名字",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
  },
  { name: "password", align: "left", label: "密码", field: "password" },
  // {
  //   name: "project",
  //   align: "left",
  //   label: "项目",
  //   field: "project",
  //   format: config.show_user_project,
  // },
  {
    name: "roleName",
    align: "left",
    label: "角色",
    field: "roleName",
    // format: val=>config.options_role_map[val],
  },

  {
    name: "mark",
    align: "left",
    label: "备注",
    field: "mark",
    format: utils.default_format_substring,
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
    name: "handle",
    align: "left",
    label: "操作",
    field: "handle",
    style: "width: 160px",
  },
];
