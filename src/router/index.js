import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import MyPage from "../views/MyPage.vue";
import SearchPage from "../views/SearchPage.vue";
import IncidentDetail from "../views/IncidentDetail.vue";
import StatusPage from "../views/StatusPage.vue";
import InitializePage from "../views/InitializePage.vue";

const routes = [
  { path: "/", name: "LoginPage", component: LoginPage },
  { path: "/register", name: "RegisterPage", component: RegisterPage },
  { path: "/mypage", name: "MyPage", component: MyPage },
  {
    path: "/search",
    name: "SearchPage",
    component: SearchPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/incident/:id",
    name: "IncidentDetail",
    component: IncidentDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/statuses",
    name: "StatusPage",
    component: StatusPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/initialize",
    name: "InitializePage",
    component: InitializePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("user="));
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next({ path: "/", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
