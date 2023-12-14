import moment from "moment";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  { name: "sid", align: "left", label: "SID", field: "sid" },

  {
    name: "names",

    label: "名字",
    align: "left",
    field: "names",
  },
  // {
  //   name: "status",
  //   align: "left",
  //   label: "状态",
  //   field: "status",

  // },
  {
    name: "order",
    align: "left",
    label: "排序",
    field: "order",
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
