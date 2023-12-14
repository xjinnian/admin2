/*
 * @FilePath: /client-api-doc-admin/src/pages/keyGroup/config/index.js
 * @Description:
 */
import moment from "moment";

import { utils } from "src/boot/utils";
import { config } from "src/boot/config";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },

  {
    name: "names",

    label: "属性组名字",
    align: "left",
    field: "names",
  },
  {
    name: "key",
    label: "属性组键",
    align: "left",
    field: "key",
  },
  {
    name: "statistics",
    label: "组内数据统计",
    align: "left",
    field: "statistics",
  },
  {
    name: "project",
    align: "left",
    label: "布局模板",
    field: "project",
    format: (val) => {
      return config?.options_client_project_map[val]
    }
  },

  {
    name: "operator",
    label: "最后操作人",
    align: "left",
    field: "operator",
  },

  {
    name: "type",
    align: "left",
    label: "键类型",
    field: "type",
    format: (val) => config.options_client_type.find(v => v.value===val)?.label,
  },
  {
    name: "level",
    align: "left",
    label: "类型",
    field: "level",
  },
  {
    name: "status",
    label: "状态",
    align: "left",
    field: "status",
    format: config.options_status_label_fn,
  },

  {
    name: "descriptions",
    align: "left",
    label: "描述",
    field: "descriptions",
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
