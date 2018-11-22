import { COLLECTION_GETTERS, MODEL_GETTERS } from '@/store/lib/mixins'

// Task Module Getters
export default {
  ...COLLECTION_GETTERS,
  ...MODEL_GETTERS,
  user: state => {
    return state.user
  },
  testing: state => {
    return state.testing
  },
  testOutput: state => {
    return state.testOutput
  },
  newModel: state => {
    return state.newModel
  },
  editModel: state => {
    return state.editModel
  }
}
