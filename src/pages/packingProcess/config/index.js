import moment from "moment";
import { utils } from "src/boot/utils";
import { config } from "src/boot/config";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },

  {
    name: "project",
    align: "left",
    label: "布局模板",
    field: "project",

  },

  {
    name: "mark",
    align: "left",
    label: "备注",
    field: "mark",

  },

  {
    name: "puck_up_record_id",
    align: "left",
    label: "打包请求的 数据库ID",
    field: "puck_up_record_id",
  },

  { name: "day", align: "left", label: "日期", field: "day" },
  { name: "env", align: "left", label: "环境", field: "env" },
  {
    name: "createdAt",
    align: "left",
    label: "创建时间",
    field: "createdAt",

    format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""),
  },


  {
    name: "puck_up_type",
    align: "left",
    label: "打包类型",
    field: "puck_up_type",
  },
  {
    name: "puck_up_time",
    align: "left",
    label: "打包时间",
    field: "puck_up_time",
  },
  {
    name: "puck_up_name",
    align: "left",
    label: "任务名字",
    field: "puck_up_name",
  },

  { name: "base_name", align: "left", label: "基础名字", field: "base_name" },

  {
    name: "zip_file_name",
    align: "left",
    label: "文件全名",
    field: "zip_file_name",
  },
  {
    name: "zip_file_full_path",
    align: "left",
    label: "保存路径",
    field: "zip_file_full_path",
  },
  {
    name: "jenkins_param_version",
    align: "left",
    label: "运维Jenkins 构建参数",
    field: "jenkins_param_version",
  },
  {
    name: "upload_folder",
    align: "left",
    label: "服务器回传目录",
    field: "upload_folder",
  },

  {
    name: "handle",
    align: "left",
    label: "操作",
    field: "handle",
  },






];
