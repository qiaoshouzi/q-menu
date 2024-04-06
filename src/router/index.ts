import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import NaiveUIDiscreteAPI from "@/assets/NaiveUIDiscreteAPI";

import HomeView from "@/views/HomeView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  // 中文路径 & 404
  const decodedPath = decodeURIComponent(to.fullPath);
  if (decodedPath !== to.fullPath) {
    return decodedPath;
  } else if (to.name === undefined) return "/404";
});

// 加载进度条
router.beforeEach((to, from, next) => {
  if (to.fullPath !== "/") NaiveUIDiscreteAPI.loadingBar.start();
  next();
});
router.afterEach((to) => {
  if (to.fullPath !== "/") NaiveUIDiscreteAPI.loadingBar.finish();
});

export default router;
