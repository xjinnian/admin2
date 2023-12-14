import moment from "moment";

import { utils } from "src/boot/utils";
import { config } from "src/boot/config";
console.log();
export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },

  {
    name: "key",
    label: "其他配置键名",
    align: "left",
    field: "key",
  },
  { name: "group_id", align: "left", label: "属性组", field: "group_id" },
  {
    name: "project",
    align: "left",
    label: "布局模板",    field: "project",
    format: (val) => {
      return config?.options_client_project_map[val]
    }
  },
  {
    name: "level",
    align: "left",
    label: "资源类型",
    field: "level",
    format: (val) => {
      return config.options_js_level.find(v=>v.value==val)?.label
    }
  },
  {
    name: "operator",
    label: "最后操作人",
    align: "left",
    field: "operator",
  },

  {
    name: "status",
    label: "状态",
    align: "left",
    field: "status",
    format: config.options_status_label_fn,
  },
  {
    name: "imgdesc",
    label: "图片描述统计",
    align: "left",
    field: "imgdesc",
    // format: (val) => JSON.stringify(val),
  },
  {
    name: "descriptions",
    label: "描述",
    align: "left",
    field: "descriptions",
  },

  {
    name: "value",
    label: "默认值 ",
    align: "left",
    field: "value",
  },

  {
    name: "custom",
    label: "是否能自定义  ",
    align: "left",
    field: "custom",
    format: (val) => (val == 1 ? "能" : ""),
  },
  {
    name: "values_type",
    label: "值类型 ",
    align: "left",
    field: "values_type",
  },

  {
    name: "values",
    label: "可选值 ",
    align: "left",
    field: "values",
    format: (val) => (val || []).join(","),
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
