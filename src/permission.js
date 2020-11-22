import router from './router'
import store from './store'
import { Message } from 'element-ui'

import { getToken } from '@/utils/auth'

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    /* has token*/
    console.log(getToken())
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => {
          // 拉取user_info
          const roles = res.roles
          console.log(roles)
          // 拉去用户信息成功,跳转主页面
          next({ path: '/' })
        })
          .catch(err => {

          })
      } else {
        next()
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // if (hasPermission(store.getters.roles, to.meta.roles)) {
        //   next()
        // } else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true }})
        // }
        // 可删 ↑
      }
    }
  } else {
    console.log(to.path)
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      next({ path: '/login' })
    }
  }
})
