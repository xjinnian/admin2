const menus = [
  // {
  //  label:'首页面板',
  //  name:'dashboard',
  //  mark:'首页面板'
  // },
  {
    label: "用户管理",
    name: "user",
    mark: "用户管理",
  },
  {
    label: "管理员",
    name: "admin",
    mark: "管理员",
  },
  {
    label: "角色管理",
    name: "role",
    mark: "角色管理",
  },
  {
    label: "APP素材管理",
    name: "appAssets",
    mark: "APP素材扫描上传",
  },
  {
    label: "系统语言管理",
    name: "language",
    mark: "语言管理",
  },
  {
    label: "客户端语言管理",
    name: "clientLanguage",
    mark: "客户端语言管理",
  },


  {
    label: "API主题标签",
    name: "questionTopic",
    mark: "主题标签",
    role: 2
  },
  {
    label: "API文档资源",
    name: "docpool",
    mark: "文档资源",
    role: 2
  },
  {
    label: "API菜单配置",
    name: "menu",
    mark: "菜单配置",
    role: 2
  },
  {
    label: "B-SDK 文档资源",
    name: "b_sdk_docpool",
    mark: "B-SDK 文档资源",
  },
  {
    label: "B-SDK 菜单配置",
    name: "b_sdk_menu",
    mark: "B-SDK 菜单配置",
  },
  {
    label: "彩票电竞SDK",
    name: "appSdkVersion",
    mark: "CP/DJ SDK",
    role: 4
  },
  // {
  //   label: "API常见问题",
  //   name: "faq",
  //   mark: "常见问题",
  // },
  // {
  //   label: "API更新记录",
  //   name: "updateRecord",
  //   mark: "更新记录",
  // },
  {
    label: "商户版本号",
    name: "configVersion",
    mark: "自定义版本号",
    role: 3
  },
  {
    label: "布局-LAYOUT",
    name: "layoutTemplate",
    mark: "布局模板",
    role: 3
  },
  {
    label: "主题-THEME",
    name: "themeTemplate",
    mark: "主题模板",
    role: 3
  },
  {
    label: "样式-CSS",
    name: "cssKey",
    mark: "CSS 属性",
    role: 3
  },
  {
    label: "功能-JS",
    name: "jsKey",
    mark: "其他配置",
    role: 3
  },

  {
    label: "素材-ASSETS",
    name: "assetsKey",
    mark: "资源默认配置",
    role: 3
  },

  {
    label: "组件-COMPONENT",
    name: "componentKey",
    mark: "组件文档",
    role: 3
  },
  {
    label: "国际化-I18N",
    name: "i18nKey",
    mark: "国际化配置",
    role: 3
  },
  {
    label: "配置分组",
    name: "keyGroup",
    mark: "配置属性分组",
    role: 3
  },
  {
    label: "后台配置记录",
    name: "keyChangeRecord",
    mark: "键记录 ",
    role: 3
  },
  {
    label: "商户配置记录",
    name: "keyConfigRecord",
    mark: "商户配置记录 ",
    role: 3
  },


  {
    label: "组合打包配置",
    name: "packingConfig",
    mark: "打包配置",
    role: 3
  },
  {
    label: "打包记录",
    name: "packingRecord",
    mark: "打包记录",
    role: 3
  },
  {
    label: "打包进程",
    name: "packingProcess",
    mark: "打包进程",
    role: 3
  },
  // {
  //   label: "接口管理",
  //   name: "middlewareInterface",
  //   mark: "中间件接口管理",
  // },
  {
    label: "賽事管理",
    name: "competitionManage",
    mark: "賽事管理",
  },
  {
    label: "MD文档记录",
    name: "mddocpool",
    mark: "MD文档记录",
  },
  {
    label: "后台操作记录",
    name: "adminRecord",
    mark: "后台操作记录",
  },

  {
    label: "辅助工具",
    name: "tool",
    mark: "辅助工具",
  },
];


export default menus

export const menus_obj = menus.reduce((pre, next) => {
  pre[next.name] = next
  return pre
},{})

