import axios from "src/api/commom/axioswapper.js";
const read_html = async (url) => {
  let { data } = await axios.get(url, {});
  // console.log("请求客户端页面域名----------------", data);
  let re = /\<base href=\/([0-9|-]+)\/ \>\<meta/;
  let arr = data.match(re);
  if (arr.length >= 2) {
    return arr[1];
  }
};

const _handle_read = async (project) => {
  let url = null;
  if (project == "h5") {
    url = "https://user-h5-bw3.sportxxx278gwf4.com";
  } else {
    url = "https://user-pc-bw4.sportxxx278gwf4.com";
  }
  let data = await read_html(url);
  //23-04-18-15-17-58
  // 自己做转换  把 图片类型的   代码内的  变量  的 图片 能预览 能放大显示
  // 放大 自己找插件
  // 例如 CSSKEY  public-bg-image6
  //  url(/image/yabo/theme02/img/png/refresh_02.png)
  //  实际显示地址
  // https://user-pc-bw4.sportxxx278gwf4.com/2023-04-18-15-17-58/image/yabo/theme02/img/png/refresh_02.png
  return `${url}/${data}`;
};

const carche_read_html = {}
export const handle_read = (project) => {
  carche_read_html[project] ??= _handle_read(project)
  return carche_read_html[project]
}
