import Vue from 'vue'
import VueRouter from 'vue-router'
import GithubSearch from '../views/GithubSearch.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'github-search',
    component: GithubSearch
  },
  {
    path: '/githubTable',
    name: 'github-table',
    component: () => import(/* webpackChunkName: "github-table" */ '../views/GithubTable.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
