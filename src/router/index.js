import Vue from 'vue'
import Router from 'vue-router'
import TopNav from '@/views/nav/topNav.vue'
import LeftNav from '@/views/nav/leftNav.vue'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import DashBoard from '@/views/workbench/dashboard.vue'
import MySettings from '@/views/workbench/mySettings.vue'
import Mission from '@/views/workbench/mission/mission.vue'
import Plan from '@/views/workbench/plan/plan.vue'
import Maillist from '@/views/workbench/maillist.vue'

import mysetA from '@/views/myset/A.vue'
import mysetB from '@/views/myset/B.vue'
import mysetC from '@/views/myset/C.vue'
import passA from '@/views/pass/A.vue'
import passB from '@/views/pass/B.vue'
import passC from '@/views/pass/C.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      type: 'login',
      component: Login
    },
    {
      path: '/',
      type: 'home',
      name: 'home',
      redirect: '/dashboard',
      component: Home,
      children: [
        {
          path: '/dashboard',
          name: '首页',
          components: {
            default: DashBoard,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        },
        {
          path: '/myset',
          components: {
            default: MySettings,
            top: TopNav,
            aside: LeftNav
          },
          name: '我的设置',
          iconCls: 'el-icon-s-tools',
          menuShow: true,
          children: [
            { path: '/myset/a', component: mysetA, name: '用户列表', menuShow: true },
            { path: '/myset/b', component: mysetB, name: '日志列表', menuShow: true },
            { path: '/myset/c', component: mysetC, name: '系统信息', menuShow: true }
          ]
        },
        {
          path: '/pass',
          components: {
            default: MySettings,
            top: TopNav,
            aside: LeftNav
          },
          name: '测试',
          iconCls: 'el-icon-box',
          menuShow: true,
          children: [
            { path: '/pass/a', component: passA, name: '折线图', menuShow: true },
            { path: '/pass/b', component: passB, name: '条形图', menuShow: true },
            { path: '/pass/c', component: passC, name: '饼图',   menuShow: true }
          ]
        }
      ]
    }
  ]
})
