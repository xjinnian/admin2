import moment from "moment";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },

  {
    name: "keyid",

    label: "配置 键ID ",

    field: "keyid",
  },

  { name: "key", align: "left", label: "键名", field: "key" },
  {
    name: "project",
    align: "left",
    label: "布局模板",
    field: "project",
    format: (val) => {
      return config?.options_client_project_map[val]
    }
  },
  {
    name: "operator",
    label: "最后操作人",
    align: "left",
    field: "operator",
  },

  {
    name: "type",
    align: "left",
    label: "键类型",
    field: "type",
    format: (val) => (val == 1 ? "CSS" : "OTHER"),
  },

  {
    name: "change",
    align: "left",
    label: "更改内容",
    field: "change",
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
