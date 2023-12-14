/*
 * @FilePath: /client-api-doc-admin/src/pages/configVersion/config/index.js
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
    label: "版本名字",
    align: "left",
    field: "name",
  },
  { name: "operator", align: "left", label: "用户名字", field: "operator" },

  {
    name: "version",
    align: "left",
    label: "版本号",
    field: "version",
  },
  {
    name: "targetProject",
    align: "left",
    label: "目标布局",
    field: "targetProject",
    format: (val) => {
      return config?.options_client_project_map[val]
    }
  },
  {
    name: "themeRefer",
    align: "left",
    label: "主题蓝本",
    field: "themeRefer",
    format: (val) => {
      return config?.options_client_theme_map[val]
    }
  },

  {
    name: "status",
    align: "left",
    label: "状态",
    field: "status",
    format: config.options_client_key_status_label_fn,
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
