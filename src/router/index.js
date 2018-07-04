import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'

// Dashboard views
import DashHome from '@/views/dashboard/DashHome'

// Dashboard -> Students
import StudentList from '@/views/dashboard/students/List'
import StudentProfile from '@/views/dashboard/students/Profile'
import StudentAdd from '@/views/dashboard/students/Add'
import StudentProgramAdd from '@/views/dashboard/students/ProgramAdd'
import StudentObjectiveAdd from '@/views/dashboard/students/ObjectiveAdd'

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
          component: StudentList
        },
        {
          path: 'students/add',
          name: 'StudentAdd',
          component: StudentAdd
        },
        {
          path: 'students/:id',
          name: 'Student',
          component: StudentProfile
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
