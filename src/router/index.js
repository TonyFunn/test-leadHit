import { createRouter, createWebHistory } from 'vue-router'
import { getItem } from '@/utils/localStorage.js'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/DefaultLayout.vue'),
    redirect: '/analytic',
    children: [
      {
        path: '/analytic',
        name: 'Analytic',
        component: () => import('@/modules/analytic/AnalyticPage.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../modules/login/LoginPage.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/modules/404/PageError404.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (!getItem('accessToken') && to.name !== 'Login') {
    return next({ name: 'Login' });
  }

  if (to.name === 'Login') {
    if (getItem('accessToken')) {
      return next({ name: 'Analytic' })
    }
    return next()
  }
  return next()
})

export default router
