import _ from 'lodash'
import { NEW_USER } from './constants'
import { COLLECTION_MUTATIONS, MODEL_MUTATIONS } from '@/store/lib/mixins'

// User Module Mutations
export default {
  ...COLLECTION_MUTATIONS,
  ...MODEL_MUTATIONS,
  tasks (state, tasks) {
    state.tasks = tasks
  },
  resetNewModel (state) {
    state.newModel = _.cloneDeep(NEW_USER)
  },
  editModel (state, model) {
    state.editModel = _.cloneDeep(model)
  }
}
