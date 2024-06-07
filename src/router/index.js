import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import MyPage from '../views/MyPage.vue';
import SearchPage from '../views/SearchPage.vue';
import IncidentDetail from '../views/IncidentDetail.vue';

const routes = [
  { path: '/', name: 'LoginPage', component: LoginPage },
  { path: '/register', name: 'RegisterPage', component: RegisterPage },
  { path: '/mypage', name: 'MyPage', component: MyPage },
  { path: '/search', name: 'SearchPage', component: SearchPage },
  { path: '/incident/:id', name: 'IncidentDetail', component: IncidentDetail }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;