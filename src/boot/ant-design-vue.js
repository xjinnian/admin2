import { boot } from "quasar/wrappers";

import { Pagination } from "ant-design-vue";
import "ant-design-vue/lib/pagination/style/css"; // 加载 CSS



// import 'ant-design-vue/dist/antd.css';

// import DatePicker from 'ant-design-vue/lib/date-picker'; // 加载 JS
// import 'ant-design-vue/lib/date-picker/style/css'; // 加载 CSS
// import 'ant-design-vue/lib/date-picker/style';         // 加载 LESS

export default boot(({ app }) => {
  app.use(Pagination);
});
