import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/views/Main'
import Index from '@/components/index'
import Partner from '@/components/partner'
import PartnerNews from '@/components/partnerNews'
import ReportAnalysisDetail from '@/components/reportAnalysisDetail'
import Newpro from '@/components/newPro'
import Login from '@/views/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/index',
      meta: {
        title: '合作事业部数字化信息系统'
      },
      children:[
        { path: '/index', component: Index },
        { path: '/partner', component: Partner },
        { path: '/partnerNews', component: PartnerNews },
        { path: '/reportAnalysisDetail', component: ReportAnalysisDetail },
        { path: '/newPro', component: Newpro },
        { path: '/newProlead', component: resolve => require(['@/components/newProlead.vue'], resolve), },
        { path: '/proDev', component: resolve => require(['@/components/proDev.vue'], resolve), },
        { path: '/proReview', component: resolve => require(['@/components/proReview.vue'], resolve), },
        { path: '/ranking', component: resolve => require(['@/components/ranking.vue'], resolve), },
        { path: '/integral', component: resolve => require(['@/components/integral.vue'], resolve), },
        { path: '/budget', component: resolve => require(['@/components/budget.vue'], resolve), },
        { path: '/reportAnalysis', component: resolve => require(['@/components/reportAnalysis.vue'], resolve), },
        { path: '/companyManage', component: resolve => require(['@/components/companyManage.vue'], resolve), },
        { path: '/brandPerformance', component: resolve => require(['@/components/brandPerformance.vue'], resolve), },
        { path: '/modelPerformance', component: resolve => require(['@/components/modelPerformance.vue'], resolve), }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '合作事业部数字化信息系统'
      }
    }
  ]
})
