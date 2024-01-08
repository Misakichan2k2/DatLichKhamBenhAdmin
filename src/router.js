import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: Info
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router