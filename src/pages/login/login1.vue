<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="img/profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">{{ title }}</div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-md">
              <q-input filled v-model="username" label="用户名" lazy-rules />

              <q-input
                :type="isPwd ? 'password' : 'text'"
                filled
                v-model="password"
                label="密码"
                lazy-rules
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <div class="text-center">
                <q-btn
                  @click="login"
                  label="登录"
                  class="full-width"
                  to="/"
                  type="button"
                  color="primary"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { api_admin } from "src/api/index";

export default defineComponent({
  setup() {
    return {
      title: process.env.title,
      username: ref(""),
      password: ref(""),
      isPwd: ref("true"),
    };
  },
  methods: {
    async login() {
      let params = {
        name: this.username,
        password: this.password,
      };
      let res = await api_admin.handle_login(params);
      let { code, data, msg, success } = res.data;
      if (success) {
        let {token,roleId,name,menus} = data
        // menus是后端返回的权限列表 初始化先写死
        // 写死 后面走接口动态配置
        let menus2 = [
          "user",
          "admin",
          "role",
          "appAssets",
          "language",
          "clientLanguage",
          "questionTopic",
          "docpool",
          "menu",
          "appSdkVersion",
          "configVersion",
          "layoutTemplate",
          "themeTemplate",
          "cssKey",
          "jsKey",
          "assetsKey",
          "componentKey",
          "i18nKey",
          "keyGroup",
          "keyChangeRecord",
          "keyConfigRecord",
          "packingConfig",
          "packingRecord",
          "packingProcess",
          "competitionManage",
          "mddocpool",
          "adminRecord",
          "tool"
      ]
        this.$q.sessionStorage.set("token", token);
        this.$q.sessionStorage.set("name", name);
        this.$q.sessionStorage.set("menus", menus);

        if(!menus.length){
          console.error('此账号角色没有配置菜单权限');
          return
        }
        const menuList = await this.$config.get_role_menuList_fn(menus)
        console.log(menuList);
        this.$router.push({
          name: menuList[0]?.name,
        });
      }
    },
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
