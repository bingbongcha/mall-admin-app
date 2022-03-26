/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import store from "@/store"
import { message } from "ant-design-vue"
import getMenuRoute from "../utils/permission"
import isAuth from "@/utils/isAuth"


Vue.use(VueRouter);
const asyncRouter = [
  {
    path: "/product",
    name: "Product",
    component: Home,
    meta: { auth: true, title: "商品",icon : "shop" },
    children: [
      {
        path: "list",
        name: "ProductList",
        component: () => import("../views/pages/ProductList.vue"),
        meta: { auth: true, title: "商品列表" ,icon : "unordered-list"}
      },
      {
        path: "add",
        name: "ProductAdd",
        component: () => import("../views/pages/ProductAdd.vue"),
        meta: { auth: true, title: "添加商品",icon : "file-add" }
      },
      {
        path: "category",
        name: "Category",
        component: () => import("../views/pages/Category.vue"),
        meta: { auth: true, title: "类目管理",icon : "appstore" }
      }
    ]
  }
]
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: true, title: "首页" ,icon : "home"},
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("../views/pages/Index.vue"),
        meta: { auth: true, title: "统计" ,icon : "bar-chart"}
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: "登录" ,hidden : true}
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  routes,
});
let isAddRoutes = false;
function setRouter() {
  const menuRoutes = getMenuRoute(store.state.user.role, asyncRouter)
  return store.dispatch("menuroute/changeRoute", routes.concat(menuRoutes)).then(() => {
    for (const route of menuRoutes) {
      router.addRoute(route)
    }
  })
}
router.beforeEach((to, from, next) => {
  if (to.meta.auth === true || isAuth(to.path, asyncRouter) === true) {
    // 页面需要鉴权
    if (store.state.user.username && store.state.user.appkey && store.state.user.role) {
      // 虽然需要鉴权，但已是登录状态
      if (!isAddRoutes) {
        setRouter().then(()=>{
          next()
        })
        isAddRoutes = true
      }
      return next()
    } else {
      // 要鉴权，还没登录，要帮用户尝试去恢复登录
      store.dispatch("user/whoAmI").then(() => {
        // 一般是要用token去后端验证正确性，每个用户有一个独一无二的token，直接用
        // 用户名判断很危险，如果别人知道了你的用户名就直接登录了
        if (!store.state.user.username) {
          // 说明恢复不成功
          message.error("该页面需要登录，请先登录")
          return next("/login")
        } else {
          if (!isAddRoutes) {
            setRouter().then(()=>{
              next()
            })
            isAddRoutes = true
          }
          return next()
        }
      })

    }
  } else {
    if (to.path === "/login" && store.state.user.username && store.state.user.appkey && store.state.user.role) {
      // 如果你在登录状态还想去登录页，重定向回主页
      return next("/")
    } else {
      return next()
    }
  }
})
export default router;
