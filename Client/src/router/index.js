import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue"
import Itemlist from '../views/dashboard/itemList.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect:"/item",
    meta:{
      reqLogin : true
    },
    children:[
      {
        path: "/category",
        name: "category",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/./dashboard/categoryList.vue"),
        meta:{
          reqLogin : true
        }
      },
      {
        path: "/item",
        name: "Item",
        component: Itemlist,
        meta:{
          reqLogin : true
        }
      }
    ]
  },
 
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to,from,next)=>{
      if(localStorage.getItem('token')){
        next({
          path:'/'
        })
      } else {
        next()
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// const isLogin = false


router.beforeEach((to,from,next) => {
 

  if(to.matched.some(record => record.meta.reqLogin)) {
    if(!localStorage.getItem('token')){
      console.log('belum login')
      next({
        path:'/login'
      })
    } else{
      next()
    }
  } else{
    next()
  }
  

});

export default router;
