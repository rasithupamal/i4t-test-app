import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../views/pages/tasks/TaskList.vue'
import NewTask from '../views/pages/tasks/NewTask.vue'
import UpdateTask from '../views/pages/tasks/UpdateTask.vue'
import ViewTask from '../views/pages/tasks/ViewTask.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'task.list',
      component: TaskList,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/tasks/create',
      name: 'task.create',
      component: NewTask,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/tasks/:id/edit',
      name: 'task.update',
      component: UpdateTask,
      props: true,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/tasks/:id/show',
      name: 'task.show',
      component: ViewTask,
      props: true,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/login',
      name: 'auth.login',
      component: () => import('../views/pages/auth/LoginPage.vue'),
      meta: {
        guest: true
      },
    },
    {
      path: '/register',
      name: 'auth.register',
      component: () => import('../views/pages/auth/RegisterPage.vue'),
      meta: {
        guest: true
      },
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        name: 'auth.login'
      })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem('token') == null) {
      next()
    } else {
      next({ name: 'task.list' })
    }
  } else {
    next()
  }
})

export default router
