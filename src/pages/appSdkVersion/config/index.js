import moment from "moment";

import { utils } from "src/boot/utils";
import { config } from "src/boot/config";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },

  {
    name: "name",
    required: true,
    label: "名字",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
  },


  { name: "version", align: "left", label: "版本", field: "version" },
  { name: "env", align: "left", label: "环境", field: "env" },
  { name: "status", align: "left", label: "内外", field: "status", format: (val) => `${val==-1?'测试版本对内':'正式版本对外'}`, },
  { name: "type", align: "left", label: "类型", field: "type", format: (val) => `${val==1?'APP':'SDK'}`, },
  { name: "filename", align: "left", label: "文件名", field: "filename",   },
  { name: "size", align: "left", label: "文件大小(MB)", field: "size",   },
  { name: "operator", align: "left", label: "最后操作人", field: "operator",   },



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


export const  option_type = [
  { label: "彩票 APP", value: 1 },
  { label: "彩票 Flutter SDK", value: 2 },
  { label: "彩票 IOS SDK", value: 5 },
  { label: "彩票 Android SDK", value: 6 },

  { label: "电竞 APP", value: 3 },
  { label: "电竞 Flutter SDK", value: 4 },
  { label: "电竞 IOS SDK", value: 7 },
  { label: "电竞 Android SDK", value: 8 },

]
export const  option_status =  [
  { label: "对内--测试版本", value: -1 },
  { label: "对外--正式版本", value: 1 },
  { label: "对外--测试版本", value: 2 },
]


  const  use_option=(arr=[], val)=>{
    let obj = arr.find(x=>x.value==val) ||{}
    return   {
      label :obj.label ||'',
      value :val
    }

}

export const  use_option_type=(val)=>{
   return use_option(option_type ,val)

}

export const  use_option_status=(val)=>{
  return use_option(option_status ,val)

}


