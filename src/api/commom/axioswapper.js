import { SessionStorage, Notify } from "quasar";

import axios from "axios";

const API_BASEURL = process.env.API_BASEURL;
const api = axios.create({ baseURL: API_BASEURL });

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let token = SessionStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    let url = response.config.url;
    let show_notify =
      url.includes("create") ||
      url.includes("update") ||
      url.includes("disable") ||
      url.includes("delete");

    if (["100003", 401].includes(response.data.code)) {
      Notify.create({ type: "negative", message: "登录已失效，请重新登录！" });
      window.location.href = window.location.origin;
    }
    if (show_notify) {
      if (response.data.code == "000000") {
        Notify.create({ type: "positive", message: "操作成功" });
      }
    }

    return response;
  },
  function (error) {
    Notify.create({ type: "negative", message: "操作发生异常！" });
    return Promise.reject(error);
  }
);

export default api;
