import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Camera'

Vue.use(VueRouter)


const Rank = () =>{
  return import("../components/Rank.vue")
}
const Map = () =>{
  return import("../components/Map.vue")
}
const Weather = () =>{
  return import("../components/Weather.vue")
}
const Search = () =>{
  return import("../components/Search.vue")
}
const Login = () =>{
  return import("../components/Login.vue")
}
const Result = () =>{
  return import("../components/Result.vue")
}
const Redirect = () =>{
  return import("../components/Redirect.vue")
}

const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/rank',
      name: 'rank',
      component: Rank
    },
    {
      path:'/map',
      name: 'map',
      component: Map
    },
    {
      path:'/weather',
      name: 'weather',
      component: Weather
    },
    {
      path:'/search',
      name: 'search',
      component: Search
    },
    {
      path:'/login',
      name: 'login',
      component: Login
    },
    {
      path:'/result',
      name: 'result',
      component: Result
    },
    {
      path:'/redirect',
      name: 'redirect',
      component: Redirect
    },
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
