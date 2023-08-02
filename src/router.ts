import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Books from './views/Books.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Books',
    component: Books,
  },
  {
    path: '/:id',
    name: 'Book',
    component: () => import('./views/Book.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('./views/Cart.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('./views/Checkout.vue')
  },
  {
    path: '/thank-you',
    name: 'Thank You',
    component: () => import('./views/ThankYou.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
