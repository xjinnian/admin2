/*
 * @FilePath: /client-api-doc-admin/src/pages/themeTemplate/config/index.js
 * @Description:
 */
import moment from "moment";
import {config} from 'src/boot/config'
export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  { name: "name", label: "主题模板名称", align: "left",

  field: "name",
  format: (val) => (val ?  val['zh_cn'] : ""),

 },
  { name: "project", align: "left", label: "布局", field: "project" ,
    format: (val) => (val ?  config?.options_client_project_map[val] : ""),
  },

  { name: "version", align: "left", label: "版本号", field: "version" },
  { name: "value", align: "left", label: "主题模板值", field: "value" },
  { name: "status", align: "left", label: "状态", field: "status" },
  { name: "imgdesc", align: "left", label: "图片描述", field: "imgdesc" },



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
