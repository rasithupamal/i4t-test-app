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
      component: TaskList
    },
    {
      path: '/tasks/create',
      name: 'task.create',
      component: NewTask
    },
    {
      path: '/tasks/:id/edit',
      name: 'task.update',
      component: UpdateTask,
      props: true
    },
    {
      path: '/tasks/:id/show',
      name: 'task.show',
      component: ViewTask,
      props: true
    },
    {
      path: '/login',
      name: 'auth.login',
      component: () => import('../views/pages/auth/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'auth.register',
      component: () => import('../views/pages/auth/RegisterPage.vue')
    }
  ]
})

export default router
