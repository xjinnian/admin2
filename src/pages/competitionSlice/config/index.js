import moment from "moment";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  { name: "send_start_time", align: "left", label: "发送开始时间", field: "send_start_time", format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""), },
  { name: "send_end_time", align: "left", label: "发送结束时间", field: "send_end_time", format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""), },
  { name: "response_data", align: "left", label: "响应数据", field: "response_data", format: (val) => JSON.stringify(val) },
  { name: "createdAt", align: "left", label: "创建时间", field: "createdAt", format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""), },
  { name: "updatedAt", align: "left", label: "更新时间", field: "updatedAt", format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""), },
  { name: "handle", align: "left", label: "操作", field: "handle", style: "width: 160px", },
];
