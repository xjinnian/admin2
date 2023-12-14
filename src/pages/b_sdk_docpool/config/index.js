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
  {
    name: "id",
    align: "left",
    label: "ID",
    field: "id",
  },
  {
    name: "name_zh",
    align: "left",
    label: "标题中文",
    field: "name_zh",
  },
  {
    name: "name_en",
    align: "left",
    label: "标题英文",
    field: "name_en",
  },

  {
    name: "page_address",
    align: "left",
    label: "链接(文档内插入)",
    field: "page_address",
  },

  {
    name: "sdk_version",
    align: "left",
    label: "版本",
    field: "sdk_version",
  },

  {
    name: "sdk_environment",
    align: "left",
    label: "环境",
    field: "sdk_environment",
  },

  {
    name: "sdk_internal_external",
    align: "left",
    label: "内外",
    field: "sdk_internal_external",
  },

  {
    name: "sdk_type",
    align: "left",
    label: "类型",
    field: "sdk_type",
  },
  
  {
    name: "sdk_file_name",
    align: "left",
    label: "sdk 文件名称",
    field: "sdk_file_name",
  },

  {
    name: "sdk_file_size",
    align: "left",
    label: "sdk 文件大小",
    field: "sdk_file_size",
    format: (val) => {
      if (!val) return "";

      if (val < 1024) {
        return val.toFixed(2) + " B";
      } else if (val < 1024 * 1024) {
        return (val / 1024).toFixed(2) + " KB";
      }

      return (val / 1024 / 1024).toFixed(2) + " MB";
    },
  },

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
    name: "create_by",
    align: "left",
    label: "创建人",
    field: "create_by",
  },
  {
    name: "updatedAt",
    align: "left",
    label: "更新时间",
    field: "updatedAt",
    format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""),
  },
  {
    name: "updatedAt",
    align: "left",
    label: "更新人",
    field: "update_by",
  },

  {
    name: "handle",
    align: "left",
    label: "操作",
    field: "handle",
    style: "width: 160px",
  },
];
