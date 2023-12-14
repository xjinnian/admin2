import moment from "moment";

import { utils } from "src/boot/utils";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },




  {
    name: "keyid",

    label: "键ID",

    field: "keyid",
  },
  {
    name: "key",

    label: "键",

    field: "key",
  },

  {
    name: "key_type",

    label: "键类型",

    field: "key_type",
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
    label: "用户名字",
    align: "left",
    field: "operator",
  },

  {
    name: "version",
    label: "版本号",
    align: "left",
    field: "version",
  },


  {
    name: "value",
    label: "值",
    align: "left",
    field: "value",
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
