/*
 * @FilePath: /client-api-doc-admin/src/pages/role/config/index.js
 * @Description:
 */
import moment from "moment";

import { utils } from "src/boot/utils";
import {menus_obj} from 'src/config/menu'
export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },

  {
    name: "name",
    required: true,
    label: "角色名",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
  },
  {
    name: "menus",
    align: "left",
    label: "菜单",
    field: "menus",
    format: (v)=>{
      let str = v.map(i=>menus_obj[i]?.label).join(',')
      return utils.default_format_substring(str)
    },
  },
  {
    name: "mark",
    align: "left",
    label: "备注",
    field: "mark",
    style: {width:'200px'},
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
