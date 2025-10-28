import { createWebHistory, createRouter } from 'vue-router'

import Generation from "../components/Generation.vue";
import Gallery from "../components/Gallery.vue";
import Explore from "../components/Explore.vue";
import SignIn from "../components/SignIn.vue";
import CustomList from "../components/CustomList.vue"

const routes = [
  { path: '/', redirect: '/generation' },
  { path: '/signin', name: 'SignIn', component: SignIn },
  { path: '/generation', name: 'Generation', component: Generation },
  { path: '/gallery', name: 'Gallery', component: Gallery },
  { path: '/explore', name: 'Explore', component: Explore },
  { path: '/custom-list', name: 'CustomList', component: CustomList },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router