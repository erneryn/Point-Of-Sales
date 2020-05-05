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
    beforeEnter: (to,from,next)=>{
      if(to.path == '/'){
        next({path : 'item'})
      }
      next()
    },
    meta:{
      reqLogin : true
    },
    children:[
      {
        path: "/about",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
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
 
  // if (to.matched.some(route => route.meta.reqLogin)) {
  //   console.log(to.matched.some(r=> console.log(r)))
  //   if (isLogin) {
  //     next();
  //   } else {
  //     console.log("ke login")
  //     next({ path: '/login' });
  //   }
  // }

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
