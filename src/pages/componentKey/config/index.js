import moment from "moment";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },

  {
    name: "name",
    label: "组件名称",
    align: "left",
    field: "name",
  },
  { name: "component_name", align: "left", label: "目标组件名称", field: "component_name" },
  { name: "project", align: "left", label: "布局模板", field: "project", },

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
