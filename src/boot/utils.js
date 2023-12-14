/*
 *
 *
 * @Description    :
 */
import { boot } from "quasar/wrappers";
import { copyToClipboard } from "quasar";
import { api_file } from "src/api/index";
const API_BASEURL = process.env.API_BASEURL;
import { Notify } from "quasar";
let utils = {
  /**
   *
   * @param {*} obj  需要 移除假值的对象
   * @param {*} exclude_keys   不参与计算的key ， 如果这些key 对应假值 将保留
   */
  remove_false_key(obj = {}, exclude_keys = []) {
    for (let i in obj) {
      if (!exclude_keys.includes(i) && !obj[i]) {
        delete obj[i];
      }
    }
  },
  /**
   * 生产随机字符串
   */
  randomstring(n = 16) {
    let result = "";
    let str = "ABCDEFGH1KLMNOPQRSTUVWXYZabCdefghijk1mnopqrstuVWxyz0123456789";
    for (let i = 0; i < n; i++) {
      let i = Math.floor(Math.random() * str.length);
      result += str[i];
    }

    return result;
  },
  /**
   *
   * 默认截取
   */
  default_format_substring(val = "") {
    val = val.trim();
    if(val.length < 20)return val
    let str = val ? (val || "").substring(0, 20) + "..." : "";

    return str;
  },

  /**
   * 复制内容
   */

  copy_text(text = "") {
    copyToClipboard(text)
      .then(() => {
        // success!

        Notify.create({
          message: "复制成功： " + text,
        });
      })
      .catch(() => {
        // fail

        Notify.create({
          message: "复制失败，请自己手动选中进行复制。",
        });
      });
  },

  /**
   * 下载md 文档
   */
  async handle_download_md_file(file_path = "", name = "") {
    let url = API_BASEURL + file_path;
    let res = await api_file.handle_read_md_file({}, url);
    let { code, data } = res;
    let filename = file_path.substring(file_path.lastIndexOf("/"));
    console.error("filename------", filename);
    let bloburl = window.URL.createObjectURL(
      new File([data], filename, {
        // type: "text/plain",
      })
    );
    console.log(data);

    let aLink = document.createElement("a");

    aLink.style.display = "none";
    aLink.setAttribute("target", "_blank");
    aLink.setAttribute("download", filename);
    aLink.setAttribute("href", bloburl);

    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
  },
};

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$lodash

  app.config.globalProperties.$utils = utils;
});

export { utils };
