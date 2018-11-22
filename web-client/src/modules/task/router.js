// Task Containers
import TaskList from './pages/list'
import TaskNew from './pages/new'
// import TaskShow from './pages/show'
import TaskEdit from './pages/edit'

const TaskListRoute = {
  path: '/tasks',
  component: TaskList
}

const TaskNewRoute = {
  path: '/tasks/new',
  component: TaskNew
}

const TaskShowRoute = {
  path: '/tasks/:id',
  component: TaskEdit,
  props: true
}

// const TaskEditRoute = {
//   path: '/tasks/:id/edit',
//   component: TaskEdit,
//   props: true
// }

export default [
  TaskListRoute,
  TaskNewRoute,
  TaskShowRoute
  // TaskEditRoute
]
