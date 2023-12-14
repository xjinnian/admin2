const options = {
  //项目 选择 配置 用户端对接的
  options_user_project: [
    { label: "OB体育", value: 1 },
    { label: "熊猫体育", value: 2 },
  ],

  //对接类型配置
  api_options: [
    { label: "免转API", value: 1 },
    { label: "转账API", value: 2 },
  ],

  // 数据状态
  options_status: [
    { label: "禁用", value: -1 },
    { label: "启用", value: 1 },
  ],

  // 客户端 项目
  options_client_project: [
    { label: "禁用", value: -1 },
    { label: "启用", value: 1 },
  ],

  //css 其他 key 配置的  状态

  options_client_key_status: [
    { label: "禁用", value: -1 },
    { label: "启用", value: 1 },
    { label: "已废弃", value: -2 },
  ],
};

/**
 * 通用的 显示 label
 * @param {*} val
 * @param {*} options
 * @returns
 */
const common_show_label_fn = (val, options) => {
  if (!val) {
    return "";
  }
  let obj = options.find((x) => x.value == val);
  return obj.label;
};
