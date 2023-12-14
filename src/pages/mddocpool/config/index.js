/*
 *
 *
 * @LastEditTime: 2022-08-05 11:51:31
 * @LastEditors: Please set LastEditors
 *
 * @FilePath: \sports-rules-admin\src\pages\mddocpool\config\index.js
 */

import moment from "moment";

import { utils } from "src/boot/utils";
export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  {
    name: "name",
    align: "left",
    label: "名称",
    field: "name",
    format: utils.default_format_substring,
  },
  {
    name: "author",
    align: "left",
    label: "作者",
    field: "author",
  },
  // {
  //   name: "path",
  //   align: "left",
  //   label: "文件地址",
  //   field: "path",
  //   format: utils.default_format_substring,
  // },

  {
    name: "document",
    align: "left",
    label: "关联文档",
    field: "document",
  },
  {
    name: "language",
    align: "left",
    label: "语言",
    field: "language",
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
