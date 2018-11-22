// TODO - replace router here - instead,
// emit an event and have it handled by another Vuex module
import router from '@/routers'
import axios from 'axios'
import { API_ROOT, EXAMPLES } from './constants'

// // // //

export default {
  // GET /api/tasks
  fetchCollection ({ state, commit, dispatch, rootGetters }) {
    commit('fetching', true)
    axios.get(API_ROOT, {
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    .then(({ data }) => {
      console.log(data)
      commit('collection', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // GET /api/tasks/:id
  fetchModel ({ state, commit, dispatch, rootGetters }, taskId) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${taskId}`, {
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    .then(({ data }) => {
      commit('model', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // BELONGS TO
  // GET /api/tasks/:id/user
  fetchUser ({ state, commit, dispatch, rootGetters }, taskId) {
    commit('fetching', true)
    axios.get(API_ROOT + '/' + taskId + '/user', {
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    .then(({ data }) => {
      commit('user', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // GET /api/tasks/:id
  fetchEditModel ({ state, commit, dispatch, rootGetters }, taskId) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${taskId}`, {
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    .then(({ data }) => {
      commit('editModel', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // POST /api/tasks
  createModel ({ state, commit, dispatch, rootGetters }, taskModel) {
    commit('fetching', true)
    axios.post(API_ROOT, taskModel, {
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    .then(({ data }) => {
      commit('fetching', false)
      router.push(`/tasks/${data._id}`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Create error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // POST /api/tasks/test
  testModel ({ state, commit, rootGetters }, { task, email }) {
    commit('testing', true)
    commit('fetching', true)
    axios.post(`${API_ROOT}/test`, { ...task, email }, {
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    .then(({ data }) => {
      console.log('TEST DATA')
      console.log(data)
      commit('fetching', false)
      commit('testOutput', data)
      commit('notification/add', { message: 'Run success', context: 'success', dismissible: true }, { root: true })
      // router.back()
    })
    .catch((err) => {
      commit('fetching', false)
      console.log(err)
      commit('notification/add', { message: 'Run error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // PUT /api/tasks/:id
  updateModel ({ state, commit, rootGetters }, taskModel) {
    commit('fetching', true)
    axios.put(`${API_ROOT}/${taskModel._id}`, taskModel, {
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    .then(({ data }) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Updated Task', context: 'success', dismissible: true }, { root: true })
      // router.back()
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Update error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // Loads an example
  loadExample ({ state, commit, rootGetters }, exampleId) {
    let example = EXAMPLES.find(f => f.id === exampleId)
    if (example) {
      const editModel = {
        _id: state.editModel._id,
        label: state.editModel.label,
        description: state.editModel.description,
        cron: state.editModel.cron,
        dependencies: example.dependencies,
        script: example.script
      }
      commit('editModel', editModel)
    }
  },
  // DELETE /api/tasks/:id
  deleteModel ({ state, commit, rootGetters }, taskModel) {
    commit('fetching', true)
    axios.delete(`${API_ROOT}/${taskModel._id}`, {
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    .then(({ data }) => {
      commit('fetching', false)
      let collection = state.collection.filter(m => m._id !== taskModel._id)
      commit('collection', collection)
      router.push(`/tasks`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Destroy error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  }
}
