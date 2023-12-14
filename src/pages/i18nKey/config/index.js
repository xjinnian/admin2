/*
 * @FilePath: /client-api-doc-admin/src/pages/i18nKey/config/index.js
 * @Description:
 */
import moment from "moment";

import { utils } from "src/boot/utils";
import { config } from "src/boot/config";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },

  {
    name: "key",
    label: "CSS变量 键名",
    align: "left",
    field: "key",
  },

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
    name: "value",
    label: "默认值",
    align: "left",
    field: "value",
  },


  {
    name: "operator",
    label: "最后操作人",
    align: "left",
    field: "operator",
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
    name: "imgdesc",
    label: "图片描述统计",
    align: "left",
    field: "imgdesc",
    // format: (val) => JSON.stringify(val),
  },

  {
    name: "status",
    label: "状态",
    align: "left",
    field: "status",
    format: config.options_status_label_fn,
  },



  {
    name: "descriptions",
    label: "描述",
    align: "left",
    field: "descriptions",
  },

  {
    name: "mark",
    align: "left",
    label: "备注",
    field: "mark",
    format: utils.default_format_substring,
  },
  {
    name: "handle",
    align: "left",
    label: "操作",
    field: "handle",
    style: "width: 160px",
  },
];
