import moment from "moment";

import { utils } from "src/boot/utils";
import { config } from "src/boot/config";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },


  { name: "method", align: "left", label: "接口 method", field: "method" },
  {
    name: "path",
    align: "left",
    label: "接口路径",
    field: "path",

  },

  {
    name: "operator",
    align: "left",
    label: "操作者",
    field: "operator",

  },
  {
    name: "target_id",
    align: "left",
    label: "操作对象ID",
    field: "target_id",

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
