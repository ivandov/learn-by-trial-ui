import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'

// Dashboard views
import DashHome from '@/views/dashboard/DashHome'
import Students from '@/views/dashboard/Students'
import StudentAdd from '@/views/dashboard/StudentAdd'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'DashHome',
          component: DashHome
        },
        {
          path: 'students',
          name: 'Students',
          component: Students
        },
        {
          path: 'students/add',
          name: 'StudentAdd',
          component: StudentAdd
        }
      ]
    }
  ]
})
