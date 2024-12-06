import { createApp } from 'vue'
import App from './App.vue'
import router from "./routeur.ts";

const app = createApp(App);
app.use(router);
app.mount('#app');
