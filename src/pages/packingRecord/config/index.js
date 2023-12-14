import moment from "moment";

import { utils } from "src/boot/utils";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  { name: "project", align: "left", label: "布局", field: "project" ,
    format: (val) => (val ?  config?.options_client_project_map[val] : ""),
  },

  {
    name: "packingConfigId",
    label: "打包配置ID",
    align: "left",
    field: "packingConfigId",
  },

  {
    name: "operator",
    label: "操作者",
    align: "left",
    field: "operator",
  },


  {
    name: "type",
    label: "打包类型",
    align: "left",
    field: "type",
  },
  { name: "env", align: "left", label: "环境", field: "env" },
  {
    name: "mark",
    align: "left",
    label: "备注",
    field: "mark",
    // format: utils.default_format_substring,
  },

  {
    name: "createdAt",
    align: "left",
    label: "创建时间",
    field: "createdAt",

    format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""),
  },
  {
    name: "type_info",
    label: "差量JSON",
    align: "left",
    field: "type2_info",
  },
  {
    name: "type_info",
    label: "全量JSON",
    align: "left",
    field: "type1_info",
  },


  {
    name: "type_info",
    label: "ZIP打包",
    align: "left",
    field: "type3_info",
  },

  {
    name: "type_info",
    label: "JS SDK",
    align: "left",
    field: "type4_info",
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
