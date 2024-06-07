import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCookies from 'vue-cookies';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueCookies, { expire: '7d' }); // クッキーの有効期限を7日に設定

app.mount('#app');