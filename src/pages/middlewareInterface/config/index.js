import moment from "moment";

import { utils } from "src/boot/utils";
import { config } from "src/boot/config";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  {
    name: "url",
    required: true,
    label: "请求地址",
    align: "left",
    field: "url",
  },
  {
    name: "desc",
    align: "left",
    label: "请求描述",
    field: "desc",
  },
  {
    name: "code_tag_id",
    align: "left",
    label: "code 码标签",
    field: "code_tag_id",
  },
  {
    name: "code_state_list",
    align: "left",
    label: "code 码列表",
    field: "code_state_list",
  },
  {
    name: "status",
    align: "left",
    label: "状态",
    field: "status",
    format: config.options_client_key_status_label_fn,
  },
  {
    name: "mark",
    align: "left",
    label: "备注",
    field: "mark",
    format: utils.default_format_substring,
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
