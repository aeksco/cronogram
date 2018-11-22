// TODO - replace router here - instead,
// emit an event and have it handled by another Vuex module
import router from '@/routers'
import axios from 'axios'
import { API_ROOT } from './constants'

// // // //

export default {
  // GET /api/users
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
  // GET /api/users/:id
  fetchModel ({ state, commit, dispatch, rootGetters }, userId) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${userId}`, {
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
  // OWNS MANY
  // GET /api/users/:id/tasks
  fetchTasks ({ state, commit, dispatch, rootGetters }, userId) {
    commit('fetching', true)

    axios.get(API_ROOT + '/' + userId + '/tasks', {
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    .then(({ data }) => {
      commit('tasks', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // GET /api/users/:id
  fetchEditModel ({ state, commit, dispatch, rootGetters }, userId) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${userId}`, {
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
  // POST /api/users
  createModel ({ state, commit, dispatch, rootGetters }, userModel) {
    commit('fetching', true)
    axios.post(API_ROOT, userModel, {
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    .then(({ data }) => {
      commit('fetching', false)
      router.push(`/users`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Create error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // PUT /api/users/:id
  updateModel ({ state, commit, rootGetters }, userModel) {
    commit('fetching', true)
    axios.put(`${API_ROOT}/${userModel._id}`, userModel, {
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    .then(({ data }) => {
      commit('fetching', false)
      router.back()
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Update error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // DELETE /api/users/:id
  deleteModel ({ state, commit, rootGetters }, userModel) {
    commit('fetching', true)
    axios.delete(`${API_ROOT}/${userModel._id}`, {
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    .then(({ data }) => {
      commit('fetching', false)
      let collection = state.collection.filter(m => m._id !== userModel._id)
      commit('collection', collection)
      router.push(`/users`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Destroy error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  }
}
