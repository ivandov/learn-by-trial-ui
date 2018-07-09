import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'

// Dashboard views
import DashHome from '@/views/dashboard/DashHome'

// Dashboard -> Students
import StudentList from '@/views/dashboard/students/List'
import StudentDash from '@/views/dashboard/students/StudentDash'
import StudentAdd from '@/views/dashboard/students/Add'
import StudentProgram from '@/views/dashboard/students/Program'
import StudentObjective from '@/views/dashboard/students/Objective'
import StudentTargets from '@/views/dashboard/students/Targets'

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
          path: 'appointments',
          name: 'Appointments',
          component: StudentList,
          props: {
            appointments: true
          }
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
          component: StudentDash
        },
        {
          path: 'students/:id/programs/add',
          name: 'StudentProgramAdd',
          component: StudentProgram,
          props: {
            create: true
          }
        },
        {
          path: 'students/:id/programs/:programId',
          name: 'StudentProgramEdit',
          component: StudentProgram
        },
        {
          path: 'students/:id/objectives/add',
          name: 'StudentObjectiveAdd',
          component: StudentObjective,
          props: {
            create: true
          }
        },
        {
          path: 'students/:id/objectives/:objectiveId',
          name: 'StudentObjective',
          component: StudentObjective
        },
        {
          path: 'students/:id/programs/:programId/targets/add',
          name: 'StudentTargetAdd',
          component: StudentTargets,
          props: {
            create: true
          }
        },
        {
          path: 'students/:id/:catchall',
          redirect: { name: 'Student' }
        }
      ]
    }
  ]
})
