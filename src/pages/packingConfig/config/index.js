/*
 * @FilePath: /client-api-doc-admin/src/pages/packingConfig/config/index.js
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
    field: "name",
  },


  {
    name: "project",
    required: true,
    label: "布局模板",
    align: "left",
    field: "project",
    format: (val) => {
      return config?.options_client_project_map[val]
    }
  },

  {
    name: "component",
    required: true,
    label: "component",
    align: "left",
    field: "component",
  },


  {
    name: "js",
    required: true,
    label: "js",
    align: "left",
    field: "js",
  },


  {
    name: "i18n",
    required: true,
    label: "i18n",
    align: "left",
    field: "i18n",
  },

  {
    name: "theme",
    required: true,
    label: "theme",
    align: "left",
    field: "theme",
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

