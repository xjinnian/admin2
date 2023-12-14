import moment from "moment";

import { utils } from "src/boot/utils";
export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  {
    name: "name_zh",
    align: "left",
    label: "标题  中文",
    field: "name_zh",
    format: utils.default_format_substring,
  },
  {
    name: "name_en",
    align: "left",
    label: "标题  英文",
    field: "name_en",
    format: utils.default_format_substring,
  },

  {
    name: "page_address",
    align: "left",
    label: "链接(文档内插入)",
    field: "page_address",
  },

  {
    name: "related_doc",
    align: "left",
    label: "关联文档",
    field: "related_doc",
  },

  {
    name: "related_faq",
    align: "left",
    label: "关联问题",
    field: "related_faq",
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
