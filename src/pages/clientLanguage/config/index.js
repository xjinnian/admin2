import moment from "moment";

import { utils } from "src/boot/utils";
import { config } from "src/boot/config";

// createdAt: "2022-07-24T06:41:27.000Z"
// default_language: "1"
// id: 1
// name_en: "Chinese simple"
// name_zh: "中文简体"
// order: 1
// status: 1
// updatedAt: "2022-07-24T06:41:27.000Z"
// value: "zh_cn"

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },

  { name: "name_zh", align: "left", label: "中文名字", field: "name_zh" },
  { name: "name_en", align: "left", label: "英文名字", field: "name_en" },
  { name: "value", align: "left", label: "键", field: "value" },
  { name: "order", align: "left", label: "排序", field: "order" },
  { name: "status", align: "left", label: "状态", field: "status" },
  {
    name: "default_language",
    align: "left",
    label: "回落语言",
    field: "default_language",
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
