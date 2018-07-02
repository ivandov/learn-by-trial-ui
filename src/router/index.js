import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'

// Dashboard views
import DashHome from '@/views/dashboard/DashHome'
import Students from '@/views/dashboard/Students'
import Student from '@/views/dashboard/Student'
import StudentAdd from '@/views/dashboard/StudentAdd'
import StudentProgramAdd from '@/views/dashboard/StudentProgramAdd'
import StudentObjectiveAdd from '@/views/dashboard/StudentObjectiveAdd'

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
          path: '/',
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
        },
        {
          path: 'students/:id',
          name: 'Student',
          component: Student
        },
        {
          path: 'students/:id/programs/add',
          name: 'StudentProgramAdd',
          component: StudentProgramAdd
        },
        {
          path: 'students/:id/programs/:program_id',
          name: 'StudentProgram',
          component: StudentProgramAdd
        },
        {
          path: 'students/:id/objectives/add',
          name: 'StudentObjectiveAdd',
          component: StudentObjectiveAdd
        },
        {
          path: 'students/:id/objectives/:objective_id',
          name: 'StudentObjectiveAdd',
          component: StudentObjectiveAdd
        }
      ]
    }
  ]
})
