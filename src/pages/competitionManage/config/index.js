import moment from "moment";

import { utils } from "src/boot/utils";

export const DATA_TYPE_MAP = { list: '列表数据', details: '详情数据' }

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  { name: "name", required: true, label: "赛事名称", align: "left", field: "name", },
  { name: "race", align: "left", label: "赛种", field: "race", },
  { name: "mid", align: "left", label: "赛事 ID", field: "mid", },
  { name: "request_type", align: "left", label: "请求类型", field: "request_type", },
  { name: "column_type", align: "left", label: "列表类型", field: "column_type", },
  { name: "data_type", align: "left", label: "数据类型", field: "data_type", format: (val) => DATA_TYPE_MAP[val] },
  { name: "start_time", align: "left", label: "开始时间", field: "start_time", format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""), },
  { name: "end_time", align: "left", label: "结束时间", field: "end_time", format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""), },
  { name: "createdAt", align: "left", label: "创建时间", field: "createdAt", format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""), },
  { name: "updatedAt", align: "left", label: "更新时间", field: "updatedAt", format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""), },
  { name: "mark", align: "left", label: "备注", field: "mark", format: utils.default_format_substring, },
  { name: "status", align: "left", label: "状态", field: "status", },
  { name: "handle", align: "left", label: "操作", field: "handle", style: "width: 160px", },
];
