import { COLLECTION_STATE, MODEL_STATE } from '@/store/lib/mixins'

// User Module State
export default {
  ...COLLECTION_STATE,
  ...MODEL_STATE,
  tasks: [],
  newModel: {},
  editModel: {}
}
