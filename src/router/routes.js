const routes = [
  {
    path: "/",
    component: () => import("src/pages/login/login1.vue"),
  },
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "user",
        name: "user",
        component: () => import("src/pages/user/index.vue"),
      },
      {
        path: "admin",
        name: "admin",
        component: () => import("src/pages/admin/index.vue"),
      },
      {
        path: "role",
        name: "role",
        component: () => import("src/pages/role/index.vue"),
      },
      {
        path: "appAssets",
        name: "appAssets",
        component: () => import("src/pages/appAssets/index.vue"),
      },
      {
        path: "language",
        name: "language",
        component: () => import("src/pages/language/index.vue"),
      },
      {
        path: "clientLanguage",
        name: "clientLanguage",
        component: () => import("src/pages/clientLanguage/index.vue"),
      },
      {
        path: "menu",
        name: "menu",
        component: () => import("src/pages/menu/index.vue"),
      },
      {
        path: "docpool",
        name: "docpool",
        component: () => import("src/pages/docpool/index.vue"),
      },
      {
        path: "b-sdk-menu",
        name: "b_sdk_menu",
        component: () => import("src/pages/b_sdk_menu/index.vue"),
      },
      {
        path: "b-sdk-docpool",
        name: "b_sdk_docpool",
        component: () => import("src/pages/b_sdk_docpool/index.vue"),
      },
      {
        path: "faq",
        name: "faq",
        meta: { type: "faq" },
        component: () => import("src/pages/docpool/index.vue"),
      },
      {
        path: "questionTopic",
        name: "questionTopic",
        component: () => import("src/pages/questionTopic/index.vue"),
      },
      {
        path: "article",
        name: "article",
        component: () => import("src/pages/article/index.vue"),
      },
      {
        path: "mddocpool",
        name: "mddocpool",
        component: () => import("src/pages/mddocpool/index.vue"),
      },
      {
        path: "tool",
        name: "tool",
        component: () => import("src/pages/tool/index.vue"),
      },

      {
        path: "configVersion",
        name: "configVersion",
        component: () => import("src/pages/configVersion/index.vue"),
      },

      {
        path: "packingConfig",
        name: "packingConfig",
        component: () => import("src/pages/packingConfig/index.vue"),
      },



      {
        path: "keyConfigRecord",
        name: "keyConfigRecord",
        component: () => import("src/pages/keyConfigRecord/index.vue"),
      },

      {
        path: "keyChangeRecord",
        name: "keyChangeRecord",
        component: () => import("src/pages/keyChangeRecord/index.vue"),
      },

      {
        path: "keyGroup",
        name: "keyGroup",
        component: () => import("src/pages/keyGroup/index.vue"),
      },

      {
        path: "cssKey",
        name: "cssKey",
        component: () => import("src/pages/cssKey/index.vue"),
      },



      {
        path: "assetsKey",
        name: "assetsKey",
        component: () => import("src/pages/assetsKey/index.vue"),
      },
      {
        path: "jsKey",
        name: "jsKey",
        component: () => import("src/pages/jsKey/index.vue"),
      },

      {
        path: "i18nKey",
        name: "i18nKey",
        component: () => import("src/pages/i18nKey/index.vue"),
      },



      {
        path: "packingRecord",
        name: "packingRecord",
        component: () => import("src/pages/packingRecord/index.vue"),
      },
      {
        path: "adminRecord",
        name: "adminRecord",
        component: () => import("src/pages/adminRecord/index.vue"),
      },
      {
        path: "packingProcess",
        name: "packingProcess",
        component: () => import("src/pages/packingProcess/index.vue"),
      },

      {
        path: "middlewareInterface",
        name: "middlewareInterface",
        component: () => import("src/pages/middlewareInterface/index.vue"),
      },
      {
        path: "competitionManage",
        name: "competitionManage",
        component: () => import("src/pages/competitionManage/index.vue"),
      },
      {
        path: "competitionManage/slice",
        name: "competitionSlice",
        component: () => import("src/pages/competitionSlice/index.vue"),
      },
      {
        path: "componentKey",
        name: "componentKey",
        component: () => import("src/pages/componentKey/index.vue"),
      },
      {
        path: "layoutTemplate",
        name: "layoutTemplate",
        component: () => import("src/pages/layoutTemplate/index.vue"),
      },
      {
        path: "themeTemplate",
        name: "themeTemplate",
        component: () => import("src/pages/themeTemplate/index.vue"),
      },

      {
        path: "appSdkVersion",
        name: "appSdkVersion",
        component: () => import("src/pages/appSdkVersion/index.vue"),
      },

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/404/index.vue')
  },
];

export default routes;
