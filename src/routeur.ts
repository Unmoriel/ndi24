import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Home from "./Home.vue";

const routes: Array<RouteRecordRaw> = [
    { path: "/", component: Home }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
