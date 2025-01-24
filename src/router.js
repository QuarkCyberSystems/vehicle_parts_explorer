// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import LandingPage from './components/LandingPage.vue';
import CarPartsExplorer from './components/CarPartsExplorer.vue';
import PartsExplorer from './components/PartsExplorer.vue';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/car-parts-explorer',
    name: 'CarPartsExplorer',
    component: CarPartsExplorer
  },
  {
    path: '/parts-explorer',
    name: 'PartsExplorer',
    component: PartsExplorer
  }
];

const router = createRouter({
  history: createWebHistory(), // or createWebHashHistory() if you prefer hash mode
  routes
});

export default router;
