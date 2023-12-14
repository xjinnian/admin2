import moment from "moment";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  {
    name: "type",
    align: "left",
    label: "类型",
    field: "type",
    style: "width:50px",
  },
  { name: "names", align: "left", label: "标题", field: "names" },

  // { name: "fatherId", align: "left", label: "父级ID", field: "fatherId" ,  },
  {
    name: "related_doc",
    align: "left",
    label: "关联文档",
    field: "related_doc",
  },

  { name: "mark", align: "left", label: "备注", field: "mark" },

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
