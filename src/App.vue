<template>
  <n-config-provider :locale="zhCN" :theme="darkTheme">
    <div style="margin: 12px 12px 0 12px">
      <div style="max-width: 1120px; margin: 0 auto">
        <n-h1
          class="siteName"
          :style="{
            'text-align': publicStore.deviceType === 'pc' ? 'start' : 'center',
          }"
        >
          Qiao's Network Menu
        </n-h1>
        <div style="display: flex; flex-wrap: wrap; gap: 5px">
          <n-button
            v-for="(value, key) in routes"
            :key="key"
            block
            strong
            secondary
            type="primary"
            style="flex: 1"
            @click="goTo(value.url)"
          >
            {{ value.name }}
          </n-button>
        </div>
        <div style="margin-top: 12px; font-size: 16px">
          <div v-for="(value, key) in [...routes, ...others]" :key="key">
            <n-text type="info">
              {{ value.name }}
            </n-text>
            <span style="margin-left: 5px">{{ getHost(value.url) }}</span>
          </div>
        </div>
      </div>
    </div>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import { NH1, NText, NButton } from "naive-ui";
import { zhCN, darkTheme, NGlobalStyle, NConfigProvider } from "naive-ui"; // NaiveUI Config

import { usePublicStore } from "./stores";

const publicStore = usePublicStore();

// 平台
const resizeEvent = () => {
  const pageWidth = window.innerWidth;
  if (pageWidth <= 1120) publicStore.deviceType = "phone";
  else publicStore.deviceType = "pc";
};
window.addEventListener("resize", () => resizeEvent());
resizeEvent();

type Routes = {
  name: string;
  url: string;
}[];
const routes: Routes = [
  {
    name: "光猫",
    url: "http://192.168.1.1/",
  },
  {
    name: "AC86U",
    url: "http://192.168.1.3/",
  },
  {
    name: "AC66U",
    url: "http://192.168.1.4/",
  },
  {
    name: "OpenWrt",
    url: "http://192.168.1.2/",
  },
  {
    name: "Switch",
    url: "http://192.168.1.5/",
  },
  {
    name: "NAS",
    url: "https://nas.h.cfm.moe:5001/",
  },
  {
    name: "iDrac",
    url: "https://192.168.1.135/",
  },
  {
    name: "Surge",
    url: "http://192.168.1.6:6166/web/index.html#/",
  },
];
const others: Routes = [
  {
    name: "R730XD",
    url: "192.168.1.109",
  },
];

const goTo = (url: string) => {
  window.open(url);
};
const getHost = (url: string) => {
  try {
    return new URL(url).host;
  } catch (error) {
    return url;
  }
};
</script>

<style scoped>
.siteName {
  font-family: "Lolita";
  font-style: normal;
  font-weight: bold;
  letter-spacing: 3px;
  white-space: nowrap;
  cursor: default;
}
</style>
