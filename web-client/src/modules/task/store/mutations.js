import _ from 'lodash'
import { NEW_TASK } from './constants'
import { COLLECTION_MUTATIONS, MODEL_MUTATIONS } from '@/store/lib/mixins'

// Task Module Mutations
export default {
  ...COLLECTION_MUTATIONS,
  ...MODEL_MUTATIONS,
  user (state, user) {
    state.user = user
  },
  testing (state, testing) {
    state.testing = testing
  },
  testOutput (state, testOutput) {
    state.testOutput = testOutput
  },
  resetNewModel (state) {
    state.newModel = _.cloneDeep(NEW_TASK)
  },
  editModel (state, model) {
    state.editModel = _.cloneDeep(model)
  }
}
