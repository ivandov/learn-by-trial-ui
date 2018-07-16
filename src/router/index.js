import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'

// Dashboard views
import DashHome from '@/views/dashboard/DashHome'

// Dashboard -> Students
import Students from '@/views/dashboard/students/StudentsList'
import StudentDash from '@/views/dashboard/students/StudentDash'
import StudentMain from '@/views/dashboard/students/StudentMain'

// Dashboard -> Appointments
import AppointmentDash from '@/views/dashboard/appointments/AppointmentDash'
import AppointmentMain from '@/views/dashboard/appointments/AppointmentMain'
import SessionDash from '@/views/dashboard/appointments/SessionDash'

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
          component: Students,
          props: {
            appointments: true
          }
        },
        {
          path: 'students/:id',
          name: 'Student',
          component: StudentDash,
          children: [
            {
              path: '/',
              name: 'StudentDashHome',
              component: StudentMain
            }
          ]
        },
        {
          path: 'students/:id/appointments',
          name: 'AppointmentDash',
          component: AppointmentDash,
          children: [
            {
              path: ':appointmentId',
              name: 'AppointmentMain',
              component: AppointmentMain
            },
            {
              path: ':appointmentId/sessions/:sessionId',
              name: 'SessionDash',
              component: SessionDash
            }
          ]
        },
        {
          path: 'students/:id/:catchall',
          redirect: { name: 'Student' }
        }
      ]
    }
  ]
})
