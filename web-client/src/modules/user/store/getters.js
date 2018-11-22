import { COLLECTION_GETTERS, MODEL_GETTERS } from '@/store/lib/mixins'

// User Module Getters
export default {
  ...COLLECTION_GETTERS,
  ...MODEL_GETTERS,
  tasks: state => {
    return state.tasks
  },
  newModel: state => {
    return state.newModel
  },
  editModel: state => {
    return state.editModel
  }
}
