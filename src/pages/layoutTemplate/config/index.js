import moment from "moment";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  { name: "name", label: "布局模板名称", align: "left", field: "name", },
  { name: "value", align: "left", label: "布局模板值", field: "value" },
  { name: "folder", align: "left", label: "客户端目录", field: "folder" },
  { name: "mirror", align: "left", label: "镜像模板", field: "mirror" },
  { name: "operator", label: "最后操作人", align: "left", field: "operator", },

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
