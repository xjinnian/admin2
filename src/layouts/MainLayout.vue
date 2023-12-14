<template>
  <q-layout view="hHh Lpr lFf">
    <q-resize-observer @resize="onResize" />
    <q-btn class="auxiliary_tool" flat dense @click="show_auxiliary_tool = true"
      >[ 辅助工具 ]</q-btn
    >
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>{{ title }}</q-toolbar-title>
        <q-space />
        <a
          href="https://typora.io/"
          target="_blank"
          class="q-mr-lg"
          rel="noopener noreferrer"
        >
          typora 专业md文档编辑器下载
        </a>
        <div class="q-gutter-sm row items-center no-wrap items-center">
          <q-btn
            round
            dense
            flat
            color="white"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
            v-if="$q.screen.gt.sm"
          >
          </q-btn>
          <div>
            {{ $q.sessionStorage.getItem('name').toLowerCase() }}
          </div>

          <!-- <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating> 5 </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn
                    label="View All"
                    style="max-width: 120px !important"
                    flat
                    dense
                    class="text-indigo-8"
                  ></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn> -->
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="img/boy-avatar.png" />
            </q-avatar>
            <q-menu>
              <q-list style="min-width: 100px">
                <!-- <q-card class="text-center no-shadow no-border"> -->
                <div class="text-center">
                  <q-btn
                    label="登出"
                    style="max-width: 120px !important"
                    flat
                    dense
                    @click="handle_logout"
                    class="text-indigo-8 q-mx-md"
                  ></q-btn>
                </div>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="230"
      class="bg-primary text-white"
    >
      <q-list>
        <q-item
          v-for="(item1, index1) in menu_config"
          :key="index1"
          clickable
          @click="handle_menu_item_click(item1)"
          class="cursor-pointer"
          :active="current_route_name == item1.name"
          active-class="q-item-no-link-highlighting"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item1.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view :key="$route.path" />
    </q-page-container>

    <q-dialog v-model="show_auxiliary_tool">
      <q-card style="width: 620px; max-width: 620px">
        <q-card-section class="q-pt-none">
          <AuxiliaryTool />
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn color="primary" label="关闭" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import AuxiliaryTool from "src/pages/tool/index.vue";
import EssentialLink from "components/EssentialLink.vue";
import Messages from "./Messages";

import { defineComponent, ref } from "vue";

import menuConfig from "src/config/menu.js";
import { mapActions } from "vuex";
import { useQuasar } from "quasar";
import {config} from "src/boot/config";
export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    Messages,
    AuxiliaryTool,
  },
  data() {
    return {
      show_auxiliary_tool: false,
      title: process.env.title,
    };
  },

  setup() {
    const $q = useQuasar()
    const leftDrawerOpen = ref(false);

    let menu_config = ref([]);
    const get_menus = async ()=>{
      menu_config.value = await config.get_role_menuList_fn()
      console.log(menu_config);
    }
    get_menus()
    // let menu_config = config.get_role_menuList_fn()

    return {
      leftDrawerOpen,
      menu_config,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  computed: {
    current_route_name() {
      return this.$route.name;
    },
  },
  created() {
    this.set_all_language();
    this.set_questionTopic();
    this.set_all_documdent();
    this.set_all_keygroup();
    this.set_all_layout();
  },
  methods: {
    ...mapActions([
      "set_window_size",
      "set_all_language",
      "set_questionTopic",
      "set_all_documdent",
      "set_all_keygroup",
      "set_all_layout"
    ]),
    showAuxiliaryTool() {
    },
    handle_menu_item_click(item) {
      this.$router.push({
        name: item.name,
      });
    },
    onResize(size) {
      this.set_window_size(size);
    },
    handle_logout() {
      this.$q.sessionStorage.clear();
      this.$router.push({ path: "/" });
    },
  },
});
</script>

<style>
button.auxiliary_tool {
  position: fixed;
  z-index: 6001;
  right: 360px;
  top: 10px;
  color: #fff;
}

.auxiliary_tool_dialog {
  position: fixed;
  top: 10vh;
  left: 50%;
}
</style>
