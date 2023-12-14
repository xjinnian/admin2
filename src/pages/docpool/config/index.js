/*
 *
 *
 * @LastEditTime: 2022-09-19 18:05:53
 * @LastEditors: Please set LastEditors
 *
 * @FilePath: \client-api-doc-admin\src\pages\docpool\config\index.js
 */

import moment from "moment";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  { name: "name_zh", align: "left", label: "标题中文", field: "name_zh" },
  { name: "name_en", align: "left", label: "标题英文", field: "name_en" },

  {
    name: "page_address",
    align: "left",
    label: "链接(文档内插入)",
    field: "page_address",
  },
  {
    name: "url",
    align: "left",
    label: "url",
    field: "url",
  },

  // {
  //   name: "is_top",
  //   align: "left",
  //   label: "置顶",
  //   field: "is_top",
  //   format: (val) => (val ? "是" : ""),
  // },

  // {
  //   name: "use_md",
  //   align: "left",
  //   label: "使用MD文档",
  //   field: "use_md",
  //   format: (val) => (val ? "是" : "否"),
  // },

  {
    name: "mulit_language",
    align: "left",
    label: "语种开启配置",
    field: "mulit_language",
  },

  {
    name: "topic",
    align: "left",
    label: "主题标签",
    field: "topic",
  },

  {
    name: "related_faq",
    align: "left",
    label: "关联问题",
    field: "related_faq",
    format: (val) => ((val || []).length > 0 ? "有" : ""),
  },
  {
    name: "mark",
    align: "left",
    label: "备注",
    field: "mark",
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
