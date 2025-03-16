import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: '/',
                name: 'main',
                component: () => import('@/views/MainPage.vue')
            },
            {
                path: '/:key',
                name: 'article-key',
                component: () => import('@/views/ArticlePage.vue')
            }
        ]
    },
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})
