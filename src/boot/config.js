import { ref } from 'vue'
import { boot } from "quasar/wrappers";
import { api_layoutTemplate,api_role,api_themeTemplate } from 'src/api';
import { KEY_TYPE_ASSETS_KEY, KEY_TYPE_COMPONENT_KEY, KEY_TYPE_CSS_KEY, KEY_TYPE_JS_KEY, KEY_TYPE_LAYOUT_KEY, KEY_TYPE_THEME_KEY } from 'src/config/key_type';
import menus_config,{ menus_obj } from "src/config/menu.js";
import { SessionStorage } from 'quasar';
import router from 'src/router';
const options = {
  CDN_URL:'https://assets-image.oceasfe.com',
  // CDN_URL:'http://127.0.0.1:18101',
  //项目 选择 配置 用户端对接的  标定 商户对应的 对接 项目
  options_user_project: [
    { label: "OB体育", value: 1 },
    { label: "熊猫体育", value: 2 },
  ],
  options_role_options: [
    { label: "管理员", value: 1 },
    { label: "api文档", value: 2 },
    { label: "模块化", value: 3 },
    { label: "app", value: 4 },
  ],
  options_role_map:{
    1:'管理员',
    2:'api文档',
    3:'模块化',
    4:'app',
  },

  //对接类型配置 转账 免转
  options_api: [
    { label: "免转API", value: 1 },
    { label: "转账API", value: 2 },
  ],

  //  通用  数据状态
  options_status: [
    { label: "禁用", value: -1 },
    { label: "启用", value: 1 },
    { label: "已废弃", value: -2 },
  ],

  // 客户端 项目  模块化 的 项目
  options_client_type: [
    { label: "CSS", value: KEY_TYPE_CSS_KEY },
    { label: "JS", value: KEY_TYPE_JS_KEY },
    { label: "ASSET", value: KEY_TYPE_ASSETS_KEY },
  ],

  //css 其他 key 配置的  状态

  options_client_key_status: [
    { label: "禁用", value: -1 },
    { label: "启用", value: 1 }
  ],
  // 打包 环境
  options_pack_up: [
    { label: '开发', value: 'dev' },
    { label: '测试', value: 'test' },
    { label: '隔离', value: 'geli' },
    { label: 'mini', value: 'mini' },
    { label: '试玩', value: 'shiwan' },
    { label: '生产', value: 'online' },
  ],
  // css 级别
  options_css_level: [
    { label: 'component', value: 1 },
    { label: 'global', value: 2 },
  ],
  css_level_map:{
    1: 'component',
    2: 'global'
  },
  // js 级别
  options_js_level: [
    { label: 'component', value: 1 },
    { label: 'global', value: 2 },

  ],
  js_level_map:{
    1: 'component',
    2: 'global'
  },
  // assets 级别
  options_asset_level: [
    { label: 'other', value: 1 },
    { label: 'sprite', value: 2 },
  ],
  asset_level_map:{
    1: 'other',
    2: 'sprite'
  },
  // key_type
  options_key_type: [
    { label: 'css', value: KEY_TYPE_CSS_KEY },
    { label: 'js', value: KEY_TYPE_JS_KEY },
    { label: 'layout', value: KEY_TYPE_LAYOUT_KEY },
    { label: 'component', value: KEY_TYPE_COMPONENT_KEY },
    { label: 'theme', value: KEY_TYPE_THEME_KEY },
    { label: 'i18n', value: KEY_TYPE_THEME_KEY },
    { label: 'assets', value: KEY_TYPE_ASSETS_KEY },
  ],



  _options_client_project: ref(null),

  _options_client_project_map: ref({}),

  _options_client_theme: ref(null),

  _options_client_theme_map: ref({}),

  _role_menuList: ref([]),
};

// 拼接cdn资源地址
const get_cdn_url = (url) => {
  if(!url) return ''
  if(!url.startsWith('/')){
    url = '/' + url
  }
  return options.CDN_URL + url
}

const options_user_project_label_fn = (val) => {
  let option = options["api_options"];
  if (!val) {
    return "";
  }
  let obj = option.find((x) => x.value == val);

  return obj.label;
};

const options_api_label_fn = (val) => {
  let option = options["options_api"];
  if (!val) {
    return "";
  }
  let obj = option.find((x) => x.value == val);

  return obj.label;
};

const options_status_label_fn = (val) => {
  let option = options["options_status"];
  if (!val) {
    return "";
  }
  let obj = option.find((x) => x.value == val);

  return obj.label;
};

const options_client_type_label_fn = (val) => {
  let option = options["options_client_type"];
  if (!val) {
    return "";
  }
  let obj = option.find((x) => x.value == val);

  return obj.label;
};

const options_client_key_status_label_fn = (val) => {
  let option = options["options_client_key_status"];
  if (!val) {
    return "";
  }
  let obj = option.find((x) => x.value == val);

  return obj?.label;
};

const options_pack_up_label_fn = (val) => {
  let option = options["options_pack_up"];
  if (!val) {
    return "";
  }
  let obj = option.find((x) => x.value == val);

  return obj.label;
};

const options_key_type_label_fn = (val) => {
  let option = options["options_key_type"];
  if (!val) {
    return "";
  }
  let obj = option.find((x) => x.value == val);

  return obj.label;
};


const get_role_menuList_fn = async ()=>{
  const menus = SessionStorage.getItem('menus') // ['a','b']
  console.log('menus',menus);
  if(!menus?.length){
    SessionStorage.clear()
    router.push({ path: "/" });
    return Promise.reject('暂未设置角色')
  }
  // const { data } = await api_role.handle_info({id:roleId})
  const menu_res = menus_config.filter(item=>menus.includes(item.name)).filter(Boolean)
  // console.log(menu_res);
  return menu_res
}



let config = {
  // 是否显示 删除按钮
  show_delete: process.env.NODE_ENV == "development",

  ...options,
  get_cdn_url,
  //项目 选择 配置 用户端对接的  标定 商户对应的 对接 项目
  options_user_project_label_fn,
  //对接类型配置 转账 免转
  options_api_label_fn,
  //通用  数据状态
  options_status_label_fn,
  // 客户端 项目  模块化 的 项目 1 CSS 2 OTHER
  options_client_type_label_fn,
  //css 其他 key 配置的  状态
  options_client_key_status_label_fn,
  // 键类型
  options_key_type_label_fn,

  // 打包环境
  options_pack_up_label_fn,
  // 获取权限菜单
  get_role_menuList_fn
};

const initOptionsClientProject = () => {
  if (config._options_client_project.value) return

  config._options_client_project.value = []

  api_layoutTemplate.handle_read({currentPage:1, pageSize:1000}).then(({ data }) => {
    config._options_client_project.value = data?.data?.docs.map((v) => {
      config._options_client_project_map.value[v.value] = v.name
      return { label: v.name, value: v.value }
    })
  })
}

const initOptionsClientTheme = async () => {
  if (config._options_client_theme.value) return

  config._options_client_theme.value = []

  api_themeTemplate.handle_read({currentPage:1, pageSize:1000}).then(({ data }) => {
    config._options_client_theme.value = data?.data?.docs.map((v) => {
      config._options_client_theme_map.value[v.value] = v.name.zh_cn
      return { label: v.name.zh_cn, value: v.value }
    })
  })
}

Object.defineProperty(config, 'options_client_project', { get: () => (initOptionsClientProject(), config._options_client_project.value) })
Object.defineProperty(config, 'options_client_project_map', { get: () => (initOptionsClientProject(), config._options_client_project_map.value) })
Object.defineProperty(config, 'options_client_theme_map', { get: () => (initOptionsClientTheme(), config._options_client_theme_map.value) })


export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$lodash
  app.config.globalProperties.$config = config;
});
export { config };
